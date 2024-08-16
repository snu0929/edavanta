const prompts = require("./prompts.json");
const users = require("./users.json");

// console.log("Prompts Data:", prompts);

// Write your code here...

/**
 * Task:
 *   - Here is the json file which contains number of prompts with structure
 *
 *  @Prompts:
 *  - _id: ObjectId
 *  - prompt: <prompt>
 *  - label: <label>
 *  - visibility: [public, private, custom],
 *  - sharedAccess: [],
 *  - description: "",
 *  - type: '',
 *  - subtype: '',
 *  - actor: { username: '' }
 *
 *  @Users:
 *    - username:
 *    - email:
 *    - password:
 *    - firstName:
 *    - lastName:
 *    - email:
 *
 *  @Description:
 *    - import both JSON files prompts.json user.json
 *    - write a class Prompts which takes prompts schema as input
 *    - create methods for create, update, get, getAll, delete prompts
 *    - prompts can only be access with the username.
 *    - You can only see the prompts that are either public or their they are created by you
 *    - Implement the logic for sharedAccess where visibility is custom, and other user can see those prompts if they are in sharedAccess list
 */

class Prompts {
  constructor(prompts) {
    this.prompts = prompts;
  }

  // Create a new prompt
  createPrompt(newPrompt) {
    console.log("Creating a new prompt:", newPrompt);
    this.prompts.push(newPrompt);
    return newPrompt;
  }

  // Update an  prompt
  updatePrompt(id, updatedPrompt, username) {
    console.log(`Updating prompt with id: ${id}`);
    const index = this.prompts.findIndex((prompt) => prompt._id.$oid === id);
    if (index !== -1 && this.prompts[index].actor.username === username) {
      this.prompts[index] = { ...this.prompts[index], ...updatedPrompt };
      console.log("Updated Prompt:", this.prompts[index]);
      return this.prompts[index];
    }
    console.log("Prompt not found or user does not have permission .");
    return null;
  }

  // Get a  prompt by id
  getPrompt(id, username) {
    console.log(`Getting prompt with id: ${id} for user: ${username}`);
    const prompt = this.prompts.find((prompt) => prompt._id.$oid === id);
    if (prompt && this.hasAccess(prompt, username)) {
      console.log("Found Prompt:", prompt);
      return prompt;
    }
    console.log("Prompt user does not have access.");
    return null;
  }

  // Get all prompts accessible by a user
  getAllPrompts(username) {
    console.log(`Getting all prompts for user: ${username}`);
    const accessiblePrompts = this.prompts.filter((prompt) =>
      this.hasAccess(prompt, username)
    );
    console.log("Accessible Prompts:", accessiblePrompts);
    return accessiblePrompts;
  }

  // Delete a prompt by id
  deletePrompt(id, username) {
    console.log(`Deleting prompt with id: ${id} by user: ${username}`);
    const index = this.prompts.findIndex((prompt) => prompt._id.$oid === id);
    if (index !== -1 && this.prompts[index].actor.username === username) {
      const deletedPrompt = this.prompts.splice(index, 1);
      console.log("Deleted Prompt:", deletedPrompt);
      return deletedPrompt;
    }
    console.log("Prompt not found or user does not have permission to delete.");
    return null;
  }

  // Check if a user has access to a prompt
  hasAccess(prompt, username) {
    console.log(
      `Checking access for user: ${username} on prompt with visibility: ${prompt.visibility}`
    );
    if (prompt.visibility === "public") {
      return true;
    }
    if (prompt.visibility === "private" && prompt.actor.username === username) {
      return true;
    }
    if (
      prompt.visibility === "custom" &&
      prompt.sharedAccess.includes(username)
    ) {
      return true;
    }
    return false;
  }
}

const promptsManager = new Prompts(prompts);

// -------------------checking all methods working or not-------------------------------

// Create a new prompt
// console.log("Create Prompt:");
// const newPrompt = promptsManager.createPrompt({
//   _id: { $oid: "64b51676a6745f6db0452772" },
//   prompt: "New Prompt Example",
//   label: "Example Label",
//   visibility: "private",
//   actor: { username: "johndoe" },
//   description: "This is a test prompt.",
// });
// console.log("Created Prompt:", newPrompt);

// console.log("\nGet All Prompts:");
// const userPrompts = promptsManager.getAllPrompts("johndoe");
// console.log("User Prompts:", userPrompts);

// Update a prompt
// console.log("\nUpdate Prompt:");
// const updatedPrompt = promptsManager.updatePrompt(
//   "64b51676a6745f6db0452772",
//   { label: "Updated Label" },
//   "johndoe"
// );
// console.log("Updated Prompt:", updatedPrompt);

// Get a specific prompt
// console.log("\nGet Specific Prompt:");
// const specificPrompt = promptsManager.getPrompt(
//   "64b51676a6745f6db0452772",
//   "johndoe"
// );
// console.log("Specific Prompt:", specificPrompt);

// Delete a prompt
// console.log("\nDelete Prompt:");
// const deletedPrompt = promptsManager.deletePrompt(
//   "64b51676a6745f6db0452772",
//   "johndoe"
// );
// console.log("Deleted Prompt:", deletedPrompt);

// Get all prompts after deletion
// console.log("\nGet All Prompts After Deletion:");
// console.log(promptsManager.getAllPrompts("johndoe"));
