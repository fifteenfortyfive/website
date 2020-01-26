import click

from mcsn.lib import asdf, log, shell

# mcsn bootstrap
# `bootstrap` is a command for configuring a machine to be able to run all of
# the MCSN services.
#
# In short, this command will:
#
# - Check that prerequisite commands (asdf, yarn, postgres) are installed.
# - Make sure the necessary asdf plugins are all installed
#
#
# This command should be idempotent, so if there are ever updates in the
# future, users should be able to just run `mcsn bootstrap` again and be up to
# date with tooling.


@click.command()
@click.pass_obj
def bootstrap(ctx):
    log.progress("Checking for prerequisites")
    log.sub_progress("asdf")
    shell.check_prereq("asdf", "asdf-vm")
    log.sub_progress("Postgres")
    shell.check_prereq("psql", "PostgreSQL")
    log.sub_progress("Yarn")
    shell.check_prereq("yarn", "Yarn")

    log.progress("Installing asdf plugins")
    # TODO: make postgres user
    log.sub_progress("Crystal")
    asdf.ensure_plugin("crystal")
    log.sub_progress("Python")
    asdf.ensure_plugin("python")
    log.sub_progress("Node")
    asdf.ensure_plugin("nodejs")

    log.progress("Ensuring asdf shims are up to date")
    asdf.reshim()

    pass
