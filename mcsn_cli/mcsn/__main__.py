from pathlib import Path

import click

from mcsn.commands.bootstrap import bootstrap

# Import new service definitions here
from mcsn.services.web import web
from mcsn.services.api import api


class Context:
    def __init__(self):
        super()
        self._root = Path(__file__).resolve().parents[2]

    @property
    def root(self):
        return self._root


@click.group()
@click.pass_context
def cli(ctx):
    """A CLI for installing, building, and running MCSN services from anywhere
    on your machine.

    This tool is meant for running development builds locally in your terminal.
    If you just need to have services running in the background, prefer using
    `supervisorctl` instead, as it manages daemonizing processes without
    cluttering your terminal with unnecessary jobs.
    """
    click.echo("Running MCSN CLI")

    ctx.obj = Context()


cli.add_command(bootstrap)
# Add new services here (as mentioned in `services/template.py`)
cli.add_command(web)
cli.add_command(api)
