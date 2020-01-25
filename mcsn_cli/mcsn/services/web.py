import os
import subprocess

import click


def _get_service_dir(ctx):
    return os.path.join(ctx.root, "mcsn_web")


def _do_build(ctx):
    return subprocess.run(["yarn", "build", "cli"], cwd=_get_service_dir(ctx.root))


@click.group("web")
@click.pass_obj
def web(ctx):
    """Scripts for the MCSN API service"""
    click.secho("Operating on ", nl=False)
    click.secho("web", fg="cyan", bold=True, nl=False)
    click.secho(" service")


@click.command()
@click.pass_obj
def deps(_ctx):
    """Install tooling and dependencies for the service"""
    click.secho("deps ", fg="yellow", bold=True, nl=False)
    click.secho("has not been implemented", fg="yellow")


@click.command()
@click.pass_obj
def build(ctx):
    """Build the service to prepare for running"""
    _do_build(ctx)


@click.command()
@click.pass_obj
def start(ctx):
    """
    Start yarn as a subprocess and let it run.

    This command should not daemonize the process and instead should let it
    run directly, outputting to the console as if the command was invoked
    directly.
    """
    subprocess.run(["yarn", "serve"], cwd=_get_service_dir(ctx))


web.add_command(deps)
web.add_command(build)
web.add_command(start)
