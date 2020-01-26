import os

import click

from mcsn.lib import log, shell


def _get_service_dir(ctx):
    return os.path.join(ctx.root, "mcsn_web")


@click.group("web")
@click.pass_obj
def web(ctx):
    """Scripts for the MCSN frontend service"""
    click.secho("Operating on ", nl=False)
    click.secho("web", fg="cyan", bold=True, nl=False)
    click.secho(" service")

    shell.set_working_dir(_get_service_dir(ctx))


@click.command()
@click.pass_obj
def deps(_ctx):
    """Install tooling and dependencies for the service"""
    log.progress("Installing Node")
    result = shell.run(["asdf", "install"])
    if result.returncode != 0:
        log.error("Failed to install Node")
        exit(1)

    log.progress("Installing depdencies")
    result = shell.run(["yarn", "install"])
    if result.returncode != 0:
        log.error("Failed to install dependencies")
        exit(1)


@click.command()
@click.pass_obj
def build(ctx):
    """Build the service to prepare for running statically"""
    shell.run(["yarn", "build"])


@click.command()
@click.pass_obj
def start(ctx):
    """
    Start yarn as a subprocess and let it run.

    This command should not daemonize the process and instead should let it
    run directly, outputting to the console as if the command was invoked
    directly.
    """
    shell.run(["yarn", "serve"])


web.add_command(deps)
web.add_command(build)
web.add_command(start)
