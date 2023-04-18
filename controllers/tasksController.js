import taskModel from "../Models/taskModel.js";

const tasksController = {
    getList: async (req, res) => {
        try {
            const todos = await taskModel.find({ uesrId: req.body.user.id })
            res.json(todos)
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    getById: async (req, res) => {
        const id = req.params.id
        try {
            const todo = await taskModel.findById(id);
            res.json(todo)
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    add: async (req, res) => {
        try {
            console.log(req.body)
            const newTodo = await taskModel.create({ name:req.body.Name,uesrId: req.body.user.id })
            res.json(newTodo)
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        try {
            await taskModel.findByIdAndUpdate(id,{isCompleted: req.body.IsCompleted});
            const todo = await taskModel.findById(id);
            res.json(todo)
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const deleted = await taskModel.findByIdAndDelete(id);
            res.json(deleted);
        }
        catch (e) {
            res.status(400).json({ message: e.message });
        }
    }
}
export default tasksController;