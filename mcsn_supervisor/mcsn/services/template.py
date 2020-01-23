# This file acts as a template for defining new services that can be managed by
# `mcsn_supervisor`.
#
# To add a new service, copy this file into a new file in this directory as,
# `<service_name>.py`, then register the command with the CLI at the bottom of
# `mcsn/__init__.py`.

import click


# Change `service_name` here to the name of the name of the service this script
# will manage. Setting the name in `click.group` is important for preserving
# the name as the command line option (otherwise click will convert things like
# underscores to dashes).
@click.group("service_name")
def service_name():
    """Scripts for the MCSN API service"""
    click.secho("Operating on ", nl=False)
    click.secho("service_name", fg="cyan", bold=True, nl=False)
    click.secho(" service")
    pass


@click.command()
def deps():
    """Install tooling and dependencies for the service"""
    click.secho("deps ", fg="yellow", bold=True, nl=False)
    click.secho("has not been implemented", fg="yellow")
    pass


@click.command()
def build():
    """Build the service to prepare for running"""
    click.secho("build ", fg="yellow", bold=True, nl=False)
    click.secho("has not been implemented", fg="yellow")
    pass


@click.command()
@click.option("--watch", help="Watch source files and auto-reload on changes")
def start():
    """Start the service via supervisord"""
    click.secho("build ", fg="yellow", bold=True, nl=False)
    click.secho("has not been implemented", fg="yellow")
    pass


@click.command()
def stop():
    """Stop the service via supervisord"""
    click.secho("stop ", fg="yellow", bold=True, nl=False)
    click.secho("has not been implemented", fg="yellow")
    pass


@click.command()
def restart():
    """Restart the service via supervisord"""
    click.secho("restart ", fg="yellow", bold=True, nl=False)
    click.secho("has not been implemented", fg="yellow")
    pass


# Change `service_name` here to match the name of the `@click.group`
# function at the top of this file.
service_name.add_command(deps)
service_name.add_command(build)
service_name.add_command(start)
service_name.add_command(stop)
service_name.add_command(restart)
