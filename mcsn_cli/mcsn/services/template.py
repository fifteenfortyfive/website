# This file acts as a template for defining new services that can be managed by
# `mcsn_cli`.
#
# To add a new service, copy this file into a new file in this directory as,
# `<service_name>.py`, then register the command with the CLI at the bottom of
# `mcsn/__init__.py`.

import os

import click

from mcsn.lib import log, shell


# Returns a Path representing the root of the service being managed. `root` is
# a Path to the whole repositories root, off of which the service's directoy
# can be found.
#
# Most of the time this function just appends the name of the service, since
# services should live at the root of the repository, but third party services
# and other commands may use different paths.
def _get_service_dir(root):
    return os.path.join(root, "service_name")


# Change `service_name` here to the name of the name of the service this script
# will manage. Setting the name in `click.group` is important for preserving
# the name as the command line option (otherwise click will convert things like
# underscores to dashes).
@click.group("service_name")
@click.pass_obj
def service_name(ctx):
    """Scripts for the MCSN API service"""
    click.secho("Operating on ", nl=False)
    click.secho("service_name", fg="cyan", bold=True, nl=False)
    click.secho(" service")

    shell.set_working_dir(_get_service_dir(ctx.root))


@click.command()
@click.pass_obj
def deps(_ctx):
    """Install tooling and dependencies for the service"""
    log.not_implemented("deps")


@click.command()
@click.pass_obj
def build(_ctx):
    """Build the service to prepare for running statically"""
    log.not_implemented("build")


@click.command()
@click.pass_obj
def start(_ctx):
    """
    Start the service as a subprocess and let it run.

    This command should not daemonize the process and instead should let it
    run directly, outputting to the console as if the command was invoked
    directly.
    """
    log.not_implemented("start")


# Change `service_name` here to match the name of the `@click.group`
# function at the top of this file.
service_name.add_command(deps)
service_name.add_command(build)
service_name.add_command(start)
