# A set of utilities for running supervisor commands. All of these commands
# assume that supervisord is already running, as described in the README.

import os
from pathlib import Path
import subprocess

# supervisor always needs to be run through the virtualenv. This needs
SUPERVISOR_CMD = os.path.join(
    Path(__file__).resolve().parents[2], ".venv", "bin", "supervisorctl"
)


def start_service(service_name):
    """Tell supervisorctl to start the given process"""
    subprocess.run([SUPERVISOR_CMD, "start", service_name])


def stop_service(service_name):
    """Tell supervisorctl to stop the given process"""
    subprocess.run([SUPERVISOR_CMD, "stop", service_name])


def restart_service(service_name):
    """Tell supervisorctl to restart the given process"""
    subprocess.run([SUPERVISOR_CMD, "restart", service_name])


def reload_config():
    """Tell supervisord reload its configuration"""
    subprocess.run([SUPERVISOR_CMD, "reload"])
