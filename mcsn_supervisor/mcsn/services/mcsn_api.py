import os
import subprocess

import click

from .. import supervisor


def _get_service_dir(root):
    return os.path.join(root, "mcsn_api")


def _do_build(ctx):
    return subprocess.run(["shards", "build", "cli"], cwd=_get_service_dir(ctx.root))


@click.group("mcsn_api")
@click.pass_obj
def mcsn_api(ctx):
    """Scripts for the MCSN API service"""
    click.secho("Operating on ", nl=False)
    click.secho("mcsn_api", fg="cyan", bold=True, nl=False)
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
    click.echo("Starting mcsn_api via supervisor")
    supervisor.start_service("mcsn_basic:mcsn_web")


@click.command()
@click.pass_obj
def stop(_ctx):
    """Stop the service via supervisord"""
    click.echo("Stopping mcsn_api via supervisor")
    supervisor.stop_service("mcsn_basic:mcsn_web")


@click.command()
@click.pass_obj
def restart(_ctx):
    """Restart the service via supervisord"""
    click.echo("Restarting mcsn_api via supervisor")
    supervisor.restart_service("mcsn_basic:mcsn_web")


mcsn_api.add_command(deps)
mcsn_api.add_command(build)
mcsn_api.add_command(start)
mcsn_api.add_command(stop)
mcsn_api.add_command(restart)
