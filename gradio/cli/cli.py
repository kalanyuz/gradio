import sys

import typer
from gradio_client.cli import deploy_discord  # type: ignore
from rich.console import Console

from .commands import custom_component, deploy, print_environment_info, reload, sketch, whitelist

app = typer.Typer()
app.command("environment", help="Print Gradio environment information.")(
    print_environment_info
)
app.command(
    "deploy",
    help="Deploy a Gradio app to Spaces. Must be called within the directory you would like to deploy.",
)(deploy)
app.command("deploy-discord", help="Deploy a Gradio app to Discord.")(
    deploy_discord.main
)
app.command("sketch", help="Open the Sketch app to design a Gradio app.")(sketch)
app.command("whitelist", help="Whitelist the Gradio sharing binary file so that common antivirus software does not flag it as malware. Must be run as administrator.")(whitelist)

def cli():
    args = sys.argv[1:]
    if len(args) == 0:
        raise ValueError("No file specified.")
    if args[0] in {"deploy", "environment", "deploy-discord", "sketch", "whitelist"}:
        app()
    elif args[0] in {"cc", "component"}:
        sys.argv = sys.argv[1:]
        custom_component()
    elif args[0] in {"build", "dev", "create", "show", "publish", "install"}:
        try:
            error = f"gradio {args[0]} is not a valid command. Did you mean `gradio cc {args[0]}` or `gradio component {args[0]}`?."
            raise ValueError(error)
        except ValueError:
            console = Console()
            console.print_exception()
    else:
        typer.run(reload)
