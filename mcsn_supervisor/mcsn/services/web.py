import os
import subprocess

import click

from .. import supervisor


def _get_service_dir(root):
    return os.path.join(root, "mcsn_web")


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
@click.option("--watch", help="Watch source files and auto-reload on changes")
@click.pass_obj
def start(_ctx, watch):
    """Start the service via supervisord"""
    _ = watch
    click.echo("Starting via supervisor")
    supervisor.start_service("mcsn_basic:mcsn_web")


@click.command()
@click.pass_obj
def stop(_ctx):
    """Stop the service via supervisord"""
    click.echo("Stopping via supervisor")
    supervisor.stop_service("mcsn_basic:mcsn_web")


@click.command()
@click.pass_obj
def restart(_ctx):
    """Restart the service via supervisord"""
    click.echo("Restarting via supervisor")
    supervisor.restart_service("mcsn_basic:mcsn_web")


web.add_command(deps)
web.add_command(build)
web.add_command(start)
web.add_command(stop)
web.add_command(restart)
