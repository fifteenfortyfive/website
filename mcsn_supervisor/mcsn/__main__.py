from pathlib import Path

import click

# Import new service definitions here
from .services.web import web


class Context:
    def __init__(self):
        super()
        self._root = Path(__file__).resolve().parents[2]

    @property
    def root(self):
        return self._root


@click.group()
@click.pass_context
def mcsn_cli(ctx):
    """A CLI for installing, building, and running MCSN services from anywhere
    on your machine.

    This tool is meant for running development builds locally in your terminal.
    If you just need to have services running in the background, prefer using
    `supervisorctl` instead, as it manages daemonizing processes without
    cluttering your terminal with unnecessary jobs.
    """
    click.echo("Running MCSN CLI")

    ctx.obj = Context()


# Add new services here (as mentioned in `services/template.py`)
mcsn_cli.add_command(web)
