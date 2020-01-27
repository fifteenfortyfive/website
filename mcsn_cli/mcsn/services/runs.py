import os

import click

from mcsn.lib import log, shell


def _get_service_dir(root):
    return os.path.join(root, "mcsn_runs")


@click.group("runs")
@click.pass_obj
def runs(ctx):
    """Scripts for the MCSN API service"""
    click.secho("Operating on ", nl=False)
    click.secho("runs", fg="cyan", bold=True, nl=False)
    click.secho(" service")

    shell.set_working_dir(_get_service_dir(ctx.root))


@click.command()
@click.pass_obj
def deps(_ctx):
    """Install tooling and dependencies for the service"""
    log.progress("Updating dependencies")
    shell.run(["mix", "deps.get"])

    log.progress("Running database migrations")
    shell.run(["mix", "ecto.setup"])
    shell.run(["mix", "do", "event_store.create,", "event_store.init"])
    test_env = os.environ.copy()
    test_env["MIX_ENV"] = "test"
    shell.run(["mix", "ecto.setup"], env=test_env)


@click.command()
@click.pass_obj
def build(_ctx):
    """Build the service to prepare for running statically"""
    shell.run(["mix", "compile"])


@click.command()
@click.pass_obj
def start(_ctx):
    """
    Start the service as a subprocess and let it run.

    This command should not daemonize the process and instead should let it
    run directly, outputting to the console as if the command was invoked
    directly.
    """
    shell.run(["mix", "phx.server"])


runs.add_command(deps)
runs.add_command(build)
runs.add_command(start)
