import os

import click

from mcsn.lib import log, shell


def _get_service_dir(ctx):
    return os.path.join(ctx.root, "mcsn_api")


@click.group("api")
@click.pass_obj
def api(ctx):
    """Scripts for the MCSN API service"""
    click.secho("Operating on ", nl=False)
    click.secho("api", fg="cyan", bold=True, nl=False)
    click.secho(" service")

    shell.set_working_dir(_get_service_dir(ctx))


@click.command()
@click.pass_obj
def deps(_ctx):
    """Install tooling and dependencies for the service"""
    log.progress("Installing Crystal")
    result = shell.run(["asdf", "install"])

    if result.returncode != 0:
        log.error("Failed to install Crystal")
        exit(1)

    log.progress("Installing depdencies")
    result = shell.run(["shards", "update"])

    if result.returncode != 0:
        log.error("Failed to install dependencies")
        exit(1)

    log.progress("Building sentry watcher")
    result = shell.run(
        ["crystal", "build", "--release", "./dev/sentry_cli.cr", "-o", "./sentry"]
    )

    if result.returncode != 0:
        log.error("Failed to install dependencies")
        exit(1)


@click.command()
@click.pass_obj
def build(_ctx):
    """Build the service to prepare for running statically"""
    shell.run(["shards", "build", "cli", "--production"])


@click.command()
@click.pass_obj
def start(_ctx):
    """
    Start the service as a subprocess and let it run.

    This command should not daemonize the process and instead should let it
    run directly, outputting to the console as if the command was invoked
    directly.
    """
    shell.run(["./sentry"])


# Change `api` here to match the name of the `@click.group`
# function at the top of this file.
api.add_command(deps)
api.add_command(build)
api.add_command(start)
