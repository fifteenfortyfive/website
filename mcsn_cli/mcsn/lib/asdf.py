from mcsn.lib import shell

# asdf
# An abstraction for interacting with asdf installations and plugins.


def _afterinstall_node():
    # Node's GPG verification is dumb. I get it, but please no.
    shell.run(["~/.asdf/plugins/nodejs/bin/import-release-team-keyring"], shell=True)


PLUGIN_CALLBACKS = {"nodejs": _afterinstall_node}


def has_plugin(plugin_name):
    """Check that asdf has the given plugin installed"""
    result = shell.capture(["asdf", "plugin-list"], check=True)

    output = str(result.stdout, "utf-8")
    installed_plugins = output.split()

    if plugin_name in installed_plugins:
        return True


def install_plugin(plugin_name, url=None):
    run_args = ["asdf", "plugin-add", plugin_name]
    if url is not None:
        run_args.append(url)

    shell.run(run_args)

    callback = PLUGIN_CALLBACKS.get(plugin_name, None)
    if callback is not None:
        callback()


def ensure_plugin(plugin_name, url=None):
    """Check that asdf has the plugin installed. If not, install it."""
    if has_plugin(plugin_name):
        return True

    install_plugin(plugin_name, url)


def reshim():
    """
    Tell asdf to recalculate all of its shims so that every command is up to
    date with what's currently installed
    """
    shell.run(["asdf", "reshim"])
