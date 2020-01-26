import click


def progress(message, color="cyan"):
    click.secho(f"> {message}", fg=color)


def sub_progress(message):
    click.secho(f"  - {message}")


def error(message):
    click.secho(message, fg="red", bold=True)


def not_implemented(command):
    click.secho(command, fg="yellow", bold=True, nl=False)
    click.secho(" has not been implemented", fg="yellow")
