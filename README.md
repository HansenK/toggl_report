# Toggl Report

## Description

This is a script to get the report of the current week (for now).
It will return the in the following format:

```
[total number of hours]h

[entry 1 description]
[entry 2 description]
[entry 3 description]
[...]
```

It will also copy this report to your clipboard so it is easier to paste wherever you want.

## Getting started

To run this, it may require a lot of work. So pay close attention:

1. Run **yarn start**
2. Wait some seconds
3. See the report
4. Be happy

## Some notes

The _workspace_ id and _toggl token_ required to make this script work should be inside a **.env** file as

```
WORKSPACE_ID=
TOGGL_TOKEN=
```

This is temporary - I'm implementing something more user friendly.
