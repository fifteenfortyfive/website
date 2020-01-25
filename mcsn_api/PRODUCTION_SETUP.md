## Setting up a Production Server

We use Ansible to provision new servers. Ansible allows us to define a series of tasks and dependencies as configuration that can then be executed on nearly any platform. It also provides mechanisms for provisioning multiple servers at once using groups.

### Hosts file

First, you'll need to create a `hosts` file under `ansible/inventory`. This file defines your list of servers and the groups of servers you'd like to interact with.

You can see an example hosts file [here](/example-hosts). The only required groups as `[py3-hosts]` and `[py3-hosts:vars]`. Most modern OSs have Python 3 installed by default, but Ansible defaults to Python 2. These groups tell Ansible to use Python 3 on those servers. Other groups are up to you.

### Defining Users

In the `ansible/inventory/group_vars/all/users.yml` file, you can add and remove users who will be able to access your servers. Add your user to this file before continuing with the steps below. **If you leave our names in there, we will have access to your servers!**

### Provisioning

With the hosts file created, the playbooks can now run successfully. Ansible requires `root` access to your server via an ssh key for the initial set up. After the `setup-web` step, you _should_ be fine without it, but for simplicity, we'll continue using `root` here.

The following commands show the steps needed to go from a blank server to a production-ready instance. This includes all the required tooling, basic firewall setup, a postgres database with an application user, a `deploy` user for building and running the application, and a clone of this repository (configured under `ansible/inventory/group_vars/build-servers/vars.yml`).

This example provisions the `staging` group. You can also provide an IP or another group name to change which servers get provisioned. Only one group can be provided, but groups can contain multiple servers to provision them all at once.

These commands must be executed from the `ansible` directory.

```shell
ansible-playbook -u root -v -l staging playbooks/setup-web.yml -D
ansible-playbook -u root -v -l staging playbooks/setup-build.yml -D
ansible-playbook -u root -v -l staging playbooks/setup-db.yml -D
ansible-playbook -u root -v -l staging playbooks/config-build.yml -D
```

Crystal also requires extra libraries to be installed to be able to run the compiler. An updated list of required libraries can be found [here](https://github.com/crystal-lang/crystal/wiki/All-required-libraries). Below is the command to install all of the required libraries for an Ubuntu server (you must be a root user to run this):

```shell
sudo apt-get install \
  libbsd-dev \
  libedit-dev \
  libevent-core-2.0-5 \
  libevent-dev \
  libevent-extra-2.0-5 \
  libevent-openssl-2.0-5 \
  libevent-pthreads-2.0-5 \
  libgmp-dev \
  libgmpxx4ldbl \
  libssl-dev \
  libxml2-dev \
  libyaml-dev \
  libreadline-dev \
  automake \
  libtool \
  git \
  llvm \
  llvm-dev \
  libpcre3-dev \
  build-essential -y
```

And that's it. Your server is now completely set up to build, release, and run the API.

### Releasing the Application

Two scripts are provided under the `scripts` directory for building a new release and starting the generated application.

`./scripts/build.sh` will pull from the remote git repository, upgrade tooling, and then build the application.

`./scripts/deploy_*` files contain scripts for booting the application after it has been built. But, for a production deployment, you should use `systemctl` and the `example.service` service definition instead (detailed in the "Installing `systemd` service" section below)

These scripts will likely be updated for a more robust deployment solution in the near future.

### Accessing the Database

If you'd like to access the database remotely, you can find the generated credentials in the `.env` file on the server. The `DATABASE_URL` can then be pasted into your favorite client.

Note that the database only listens for connections on `localhost`, so you'll need to have an SSH tunnel (as any user) to be able to make the connection.

### Setting up Swapfile

Crystal uses a very large amount of RAM when compiling medium-size applications such as this one. Especially on small servers like DigitalOcean's \$5/month droplet, this is a big issue. That server is more than capable enough with CPU (even with only 1 core), but 1GB of RAM is not nearly large enough even just to build the app, let alone also have it running and a database up as well.

Swapfiles let you provide more space for the OS to move data around to simulate more RAM. It should be used _sparingly_, but is useful for situations like this.

[This guide](https://linuxize.com/post/how-to-add-swap-space-on-ubuntu-18-04/) goes through how to configure a Swapfile on Ubuntu. A 2GB Swapfile will be more than sufficient for the needs of this application.

Configuring the Swappiness to a low value is also good (to ensure that it is only really used when compiling, not in normal operation).

### Installing `systemd` service

This repo includes a basic `example.service` system service configuration. This can be installed on most unix-based servers and will take care of automatically restarting the application if it ever hard-crashes.

This also simplifies redeployment when updating the application, just the simple command `systemctl restart mcsn_api`.

To install the service, copy the configuration into `/etc/systemd/system/`:

```
cp example.service /etc/systemd/system/
```

The service is added as a `system` service because it is meant to be global, not instantiated per-user.

Note that you'll need a sudo permissions on the account managing the application (e.g., `deploy`) to be able to install and use this. `visudo` is good for this. For example, you could create an `/etc/sudoers.d/20-deploy` file and add the relevant control commands:

```
deploy  ALL=(ALL) NOPASSWD: /bin/systemctl start mcsn, /bin/systemctl stop mcsn, /bin/systemctl restart mcsn, /bin/journalctl -fu mcsn
```
