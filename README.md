# 50.043 Big Data Project

One Paragraph of project description goes here

## Setting up backend

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Virtual Environment and Flask

What things you need to install the software and how to install them

If you have virtualenv installed, please skip:
```
pip install virtualenv virtualenvwrapper
```

From there, you need to add the following lines to your ~/.bash_profile  (notice that for macOS the file name is .bash_profile  and for Ubuntu it is .bashrc .

```
nano ~/.bash_profile
```

Append the following to the end. Ensure that the path corresponds to your root python path.

```
export WORKON_HOME=$HOME/.virtualenvs
export VIRTUALENVWRAPPER_PYTHON=/usr/local/bin/python3
source /usr/local/bin/virtualenvwrapper.sh
```

Then source it

```
source ~/.bash_profile
```

Finally, create the virtual environment and install flask.

```
mkvirtualenv env_name -p python3
pip install Flask
```

Ensure you are in the virtual environment, before installing flask as this allows us to isolate our development environment.

To activate and deacivate the virtual environment:

```
workon env_name # activates virtual env
deactivate # deactivates virtual env
```

## Setting up the frontend

@frontend peeps, edit for necessary setup

