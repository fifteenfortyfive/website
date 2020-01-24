from pathlib import Path

import click

# Import new service definitions here
from .services.mcsn_api import mcsn_api


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
    """A CLI for installing, building, and running MCSN services"""
    click.echo("Running MCSN CLI")

    ctx.obj = Context()


# Add new services here (as mentioned in `services/template.py`)
mcsn_cli.add_command(mcsn_api)
