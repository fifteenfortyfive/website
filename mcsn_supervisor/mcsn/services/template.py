# This file acts as a template for defining new services that can be managed by
# `mcsn_supervisor`.
#
# To add a new service, copy this file into a new file in this directory as,
# `<service_name>.py`, then register the command with the CLI at the bottom of
# `mcsn/__init__.py`.

import os

import click


# Returns a Path representing the root of the service being managed. `root` is
# a Path to the whole repositories root, off of which the service's directoy
# can be found.
#
# Most of the time this function just appends the name of the service, since
# services should live at the root of the repository, but third party services
# and other commands may use different paths.
def _get_service_dir(root):
    return os.path.join(root, "service_name")


# Change `service_name` here to the name of the name of the service this script
# will manage. Setting the name in `click.group` is important for preserving
# the name as the command line option (otherwise click will convert things like
# underscores to dashes).
@click.group("service_name")
@click.pass_obj
def service_name(_ctx):
    """Scripts for the MCSN API service"""
    click.secho("Operating on ", nl=False)
    click.secho("service_name", fg="cyan", bold=True, nl=False)
    click.secho(" service")


@click.command()
@click.pass_obj
def deps(_ctx):
    """Install tooling and dependencies for the service"""
    click.secho("deps ", fg="yellow", bold=True, nl=False)
    click.secho("has not been implemented", fg="yellow")


@click.command()
@click.pass_obj
def build(_ctx):
    """Build the service to prepare for running"""
    click.secho("build ", fg="yellow", bold=True, nl=False)
    click.secho("has not been implemented", fg="yellow")


@click.command()
@click.option("--watch", help="Watch source files and auto-reload on changes")
@click.pass_obj
def start(_ctx, watch):
    """Start the service via supervisord"""
    click.secho("start ", fg="yellow", bold=True, nl=False)
    click.secho("has not been implemented", fg="yellow")
    # Make flake8 think `watch` is being used. Remove this when you start using
    # this flag.
    _ = watch


@click.command()
@click.pass_obj
def stop(_ctx):
    """Stop the service via supervisord"""
    click.secho("stop ", fg="yellow", bold=True, nl=False)
    click.secho("has not been implemented", fg="yellow")


@click.command()
@click.pass_obj
def restart(_ctx):
    """Restart the service via supervisord"""
    click.secho("restart ", fg="yellow", bold=True, nl=False)
    click.secho("has not been implemented", fg="yellow")


# Change `service_name` here to match the name of the `@click.group`
# function at the top of this file.
service_name.add_command(deps)
service_name.add_command(build)
service_name.add_command(start)
service_name.add_command(stop)
service_name.add_command(restart)
