# A set of utilities for running supervisor commands. All of these commands
# assume that supervisord is already running, as described in the README.

import subprocess


def start_service(service_name):
    """Tell supervisorctl to start the given process"""
    subprocess.run(["supervisorctl", "start", service_name])


def stop_service(service_name):
    """Tell supervisorctl to stop the given process"""
    subprocess.run(["supervisorctl", "stop", service_name])


def restart_service(service_name):
    """Tell supervisorctl to restart the given process"""
    subprocess.run(["supervisorctl", "restart", service_name])


def reload_config():
    """Tell supervisord reload its configuration"""
    subprocess.run(["supervisorctl", "reload"])
