import os
import subprocess

import click


def _get_service_dir(ctx):
    return os.path.join(ctx.root, "mcsn_api")


@click.group("api")
@click.pass_obj
def api(ctx):
    """Scripts for the MCSN API service"""
    click.secho("Operating on ", nl=False)
    click.secho("api", fg="cyan", bold=True, nl=False)
    click.secho(" service")

    os.chdir(_get_service_dir(ctx))


@click.command()
@click.pass_obj
def deps(_ctx):
    """Install tooling and dependencies for the service"""
    click.secho("> Installing Crystal", fg="cyan")
    result = subprocess.run(["asdf", "install"])

    if result.returncode != 0:
        click.secho("Failed to install Crystal", fg="red", bold=True)
        exit(1)

    click.secho("> Installing depdencies", fg="cyan")
    result = subprocess.run(["shards", "update"])

    if result.returncode != 0:
        click.secho("Failed to install dependencies", fg="red", bold=True)
        exit(1)

    click.secho("> Building sentry watcher", fg="cyan")
    result = subprocess.run(
        ["crystal", "build", "--release", "./dev/sentry_cli.cr", "-o", "./sentry"]
    )

    if result.returncode != 0:
        click.secho("Failed to install dependencies", fg="red", bold=True)
        exit(1)


@click.command()
@click.pass_obj
def build(_ctx):
    """Build the service to prepare for running statically"""
    subprocess.run(["shards", "build", "cli", "--production"])


@click.command()
@click.pass_obj
def start(_ctx):
    """
    Start the service as a subprocess and let it run.

    This command should not daemonize the process and instead should let it
    run directly, outputting to the console as if the command was invoked
    directly.
    """
    subprocess.run(["./sentry"])


# Change `api` here to match the name of the `@click.group`
# function at the top of this file.
api.add_command(deps)
api.add_command(build)
api.add_command(start)
