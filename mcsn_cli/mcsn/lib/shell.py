import os
import shutil
import subprocess

import click


class CommandNotFoundError(click.ClickException):
    """
    Raised when a prerequisite for MCSN services is not installed and
    bootstrapping cannot continue without it.
    """

    def __init__(self, prereq):
        super().__init__(
            f"The prerequisite `{prereq}` does not seem to be available.\n"
            + f"Check the Prequisites section of this repository's README for \n"
            + f"information on all required services."
        )

    pass


def check_prereq(command, name):
    if shutil.which(command) is None:
        raise CommandNotFoundError(name)

    return True


def set_working_dir(directory):
    return os.chdir(directory)


def run(*args, **kwargs):
    return subprocess.run(*args, **kwargs)


def capture(*args, **kwargs):
    return subprocess.run(*args, capture_output=True, **kwargs)
