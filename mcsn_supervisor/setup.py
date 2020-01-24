import os
from setuptools import setup, find_packages


def read(filename):
    return open(os.path.join(os.path.dirname(__file__), filename)).read()


setup(
    name="mcsn_supervisor",
    version="0.0.1",
    description=(
        "A tool for installing, building, and running the various services for MCSN."
    ),
    long_description=read("README.md"),
    license="MIT",
    install_requires=["Click==7.0", "supervisor==4.1.0",],
    packages=find_packages("."),
    package_dir={"mcsn": "mcsn"},
    entry_points={"console_scripts": ["mcsn = mcsn.__main__:mcsn_cli",],},
)
