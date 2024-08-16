# Edavanta Coding Project

This project implements a simple prompt management system using Node.js. It allows users to create, update, get, and delete prompts based on specific access controls. The prompts are stored in JSON files, and access to them is controlled based on the visibility settings and user permissions.

## Features

- **Create Prompt**: Add new prompts to the collection.
- **Update Prompt**: Modify existing prompts if the user has the appropriate permissions.
- **Get Prompt**: Retrieve a specific prompt by its ID, respecting visibility settings.
- **Get All Prompts**: Retrieve all prompts accessible by a specific user.
- **Delete Prompt**: Remove a prompt if the user has the appropriate permissions.
- **Access Control**: Prompts can be public, private, or custom, with custom prompts being accessible to users in the shared access list.

## JSON Structure

### Prompts (`prompts.json`)

Each prompt in the system is represented by the following structure:

```json
{
    "_id": { "$oid": "unique_object_id" },
    "prompt": "The prompt text",
    "label": "Label of the prompt",
    "visibility": "public | private | custom",
    "sharedAccess": ["username1", "username2"],
    "description": "Description of the prompt",
    "actor": { "username": "creator_username" }
}
