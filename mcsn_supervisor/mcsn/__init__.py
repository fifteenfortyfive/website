import os
import pathlib
import click

# Import new service definitions here
from .services.mcsn_api import mcsn_api


this_directory = pathlib.Path(__file__).parent.absolute()
mcsn_root = os.path.join(this_directory, "..")


@click.group()
def mcsn_cli():
    """A CLI for installing, building, and running MCSN services"""
    click.echo("Running MCSN CLI")
    pass


# Add new services here (as mentioned in `services/template.py`)
mcsn_cli.add_command(mcsn_api)
