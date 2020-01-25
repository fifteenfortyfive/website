import os
import subprocess

import click


def _get_service_dir(ctx):
    return os.path.join(ctx.root, "mcsn_web")


@click.group("web")
@click.pass_obj
def web(ctx):
    """Scripts for the MCSN frontend service"""
    click.secho("Operating on ", nl=False)
    click.secho("web", fg="cyan", bold=True, nl=False)
    click.secho(" service")

    os.chdir(_get_service_dir(ctx))


@click.command()
@click.pass_obj
def deps(_ctx):
    """Install tooling and dependencies for the service"""
    click.secho("> Installing Node", fg="cyan")
    result = subprocess.run(["asdf", "install"])
    if result.returncode != 0:
        click.secho("Failed to install Node", fg="red", bold=True)
        exit(1)

    click.secho("> Installing depdencies", fg="cyan")
    result = subprocess.run(["yarn", "install"])
    if result.returncode != 0:
        click.secho("Failed to install dependencies", fg="red", bold=True)
        exit(1)


@click.command()
@click.pass_obj
def build(ctx):
    """Build the service to prepare for running statically"""
    subprocess.run(["yarn", "build"])


@click.command()
@click.pass_obj
def start(ctx):
    """
    Start yarn as a subprocess and let it run.

    This command should not daemonize the process and instead should let it
    run directly, outputting to the console as if the command was invoked
    directly.
    """
    subprocess.run(["yarn", "serve"])


web.add_command(deps)
web.add_command(build)
web.add_command(start)
