import click


@click.group("mcsn_api")
def mcsn_api():
    """Scripts for the MCSN API service"""
    click.secho("Operating on ", nl=False)
    click.secho("mcsn_api", fg="cyan", bold=True, nl=False)
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


mcsn_api.add_command(deps)
mcsn_api.add_command(build)
mcsn_api.add_command(start)
mcsn_api.add_command(stop)
mcsn_api.add_command(restart)
