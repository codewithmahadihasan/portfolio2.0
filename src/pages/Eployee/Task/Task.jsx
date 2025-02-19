import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { format } from "date-fns"
import JoditEditor from "jodit-react"

const TaskManagement = () => {
      const [tasks, setTasks] = useState([
            {
                  id: 1,
                  text: "Product Research",
                  description: "Conduct thorough market research and analyze competitor products",
                  completed: true,
                  phase: 1,
                  assignedTo: "John",
                  priority: "High",
                  dueDate: "2024-04-01",
                  tags: ["research", "planning"]
            },
            {
                  id: 2,
                  text: "Market Analysis",
                  description: "Analyze market trends and identify target audience",
                  completed: true,
                  phase: 1,
                  assignedTo: "Sarah",
                  priority: "Medium",
                  dueDate: "2024-04-05",
                  tags: ["analysis", "marketing"]
            },
            {
                  id: 3,
                  text: "Competitor Analysis",
                  description: "Review competitor strategies and identify opportunities",
                  completed: false,
                  phase: 1,
                  assignedTo: "Mike",
                  priority: "Low",
                  dueDate: "2024-04-10",
                  tags: ["research", "competition"]
            },
            {
                  id: 4,
                  text: "Design System",
                  description: "Create a comprehensive design system for the product",
                  completed: false,
                  phase: 2,
                  assignedTo: "Emma",
                  priority: "High",
                  dueDate: "2024-04-15",
                  tags: ["design", "ui"]
            },
      ])

      const [newTask, setNewTask] = useState("")
      const [newDescription, setNewDescription] = useState("")
      const [selectedPhase, setSelectedPhase] = useState(1)
      const [assignee, setAssignee] = useState("John")
      const [priority, setPriority] = useState("Medium")
      const [dueDate, setDueDate] = useState("")
      const [showForm, setShowForm] = useState(false)
      const [searchTerm, setSearchTerm] = useState("")
      const [editingTask, setEditingTask] = useState(null)
      const [newTags, setNewTags] = useState("")

      const team = ["John", "Sarah", "Mike", "Emma"]
      const priorities = ["Low", "Medium", "High"]
      const phases = [
            { id: 1, name: "Planning" },
            { id: 2, name: "In Progress" },
            { id: 3, name: "Review" }
      ]

      const addTask = () => {
            if (newTask.trim() !== "") {
                  setTasks([
                        ...tasks,
                        {
                              id: Date.now(),
                              text: newTask,
                              description: newDescription,
                              completed: false,
                              phase: selectedPhase,
                              assignedTo: assignee,
                              priority,
                              dueDate,
                              tags: newTags.split(",").map(tag => tag.trim()).filter(tag => tag !== "")
                        },
                  ])
                  setNewTask("")
                  setNewDescription("")
                  setNewTags("")
                  setShowForm(false)
            }
      }

      const updateTask = (taskId, updates) => {
            setTasks(tasks.map(task =>
                  task.id === taskId ? { ...task, ...updates } : task
            ))
      }

      const toggleTask = (id) => {
            setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
      }

      const deleteTask = (id) => {
            setTasks(tasks.filter((task) => task.id !== id))
      }

      const onDragEnd = (result) => {
            if (!result.destination) return

            const { source, destination } = result
            const taskId = parseInt(result.draggableId)
            const newPhase = parseInt(destination.droppableId)

            if (source.droppableId !== destination.droppableId) {
                  updateTask(taskId, { phase: newPhase })
            }
      }

      const getPriorityColor = (priority) => {
            const colors = {
                  High: "text-red-500",
                  Medium: "text-yellow-500",
                  Low: "text-green-500",
            }
            return colors[priority] || "text-gray-500"
      }

      const getAssigneeInitials = (name) => {
            return name.split(" ").map(n => n[0]).join("")
      }

      const filteredTasks = tasks.filter(task =>
            task.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )

      return (
            <div className="bg-gray-900 min-h-screen">
                  <div className=" px-4 sm:px-6 lg:px-8 py-8">
                        <div className="flex justify-between items-center mb-8">
                              <h1 className="text-3xl font-bold ">Tasks</h1>
                              <button
                                    onClick={() => setShowForm(!showForm)}
                                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                              >
                                    {showForm ? "Cancel" : "New Task"}
                              </button>
                        </div>

                        <div className="mb-6">
                              <input
                                    type="text"
                                    placeholder="Search tasks, descriptions, assignees, tags..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                              />
                        </div>

                        {showForm && (
                              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                                          <div className="space-y-4">
                                                <input
                                                      type="text"
                                                      value={newTask}
                                                      onChange={(e) => setNewTask(e.target.value)}
                                                      placeholder="Task name"
                                                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                                />
                                                <JoditEditor
                                                      // config={{ readonly: false }}
                                                      // do not need here more button
                                                      config={
                                                            {
                                                                  toolbarButtonSize: "small",
                                                                  toolbarSticky: false,
                                                                  showCharsCounter: false,
                                                                  showWordsCounter: false,
                                                                  showXPathInStatusbar: false,
                                                                  disablePlugins: "about",
                                                                  buttons: "bold,italic,underline,ul,image,hr,table,link"

                                                            }

                                                      }
                                                      value={newDescription}
                                                      // onChange={(content) => setNewDescription(content)}
                                                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black h-24"
                                                />
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                      <select
                                                            value={selectedPhase}
                                                            onChange={(e) => setSelectedPhase(Number(e.target.value))}
                                                            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                                      >
                                                            {phases.map(phase => (
                                                                  <option key={phase.id} value={phase.id}>{phase.name}</option>
                                                            ))}
                                                      </select>
                                                      <select
                                                            value={assignee}
                                                            onChange={(e) => setAssignee(e.target.value)}
                                                            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                                      >
                                                            {team.map((member) => (
                                                                  <option key={member} value={member}>{member}</option>
                                                            ))}
                                                      </select>
                                                      <select
                                                            value={priority}
                                                            onChange={(e) => setPriority(e.target.value)}
                                                            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                                      >
                                                            {priorities.map((p) => (
                                                                  <option key={p} value={p}>{p}</option>
                                                            ))}
                                                      </select>
                                                      <input
                                                            type="date"
                                                            value={dueDate}
                                                            onChange={(e) => setDueDate(e.target.value)}
                                                            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                                      />
                                                </div>
                                                <input
                                                      type="text"
                                                      value={newTags}
                                                      onChange={(e) => setNewTags(e.target.value)}
                                                      placeholder="Tags (comma-separated)"
                                                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                                />
                                                <div className="flex justify-end space-x-4">
                                                      <button
                                                            onClick={() => setShowForm(false)}
                                                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                                                      >
                                                            Cancel
                                                      </button>
                                                      <button
                                                            onClick={addTask}
                                                            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                                                      >
                                                            Add Task
                                                      </button>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        )}

                        <DragDropContext onDragEnd={onDragEnd}>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {phases.map((phase) => (
                                          <Droppable key={phase.id} droppableId={phase.id.toString()}>
                                                {(provided) => (
                                                      <div
                                                            ref={provided.innerRef}
                                                            {...provided.droppableProps}
                                                            className="bg-gray-50 rounded-lg p-4"
                                                      >
                                                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                                                  {phase.name}
                                                            </h2>
                                                            <div className="space-y-3">
                                                                  {filteredTasks
                                                                        .filter((task) => task.phase === phase.id)
                                                                        .map((task, index) => (
                                                                              <Draggable
                                                                                    key={task.id}
                                                                                    draggableId={task.id.toString()}
                                                                                    index={index}
                                                                              >
                                                                                    {(provided) => (
                                                                                          <div
                                                                                                ref={provided.innerRef}
                                                                                                {...provided.draggableProps}
                                                                                                {...provided.dragHandleProps}
                                                                                                className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                                                                                          >
                                                                                                <div className="flex items-start justify-between">
                                                                                                      <div className="flex items-start space-x-3 flex-1">
                                                                                                            <button
                                                                                                                  onClick={() => toggleTask(task.id)}
                                                                                                                  className="mt-1 focus:outline-none"
                                                                                                            >
                                                                                                                  <div className={`w-4 h-4 rounded-full border-2 ${task.completed
                                                                                                                        ? "bg-black border-black"
                                                                                                                        : "border-gray-300"
                                                                                                                        }`}>
                                                                                                                        {task.completed && (
                                                                                                                              <svg className="w-3 h-3 text-white" viewBox="0 0 12 12">
                                                                                                                                    <path
                                                                                                                                          fill="currentColor"
                                                                                                                                          d="M3.7 9.6L1 6.9l.7-.7 2 2 4.6-4.6.7.7z"
                                                                                                                                    />
                                                                                                                              </svg>
                                                                                                                        )}
                                                                                                                  </div>
                                                                                                            </button>
                                                                                                            <div className="flex-1">
                                                                                                                  {editingTask === task.id ? (
                                                                                                                        <div className="space-y-2">
                                                                                                                              <input
                                                                                                                                    type="text"
                                                                                                                                    value={task.text}
                                                                                                                                    onChange={(e) => updateTask(task.id, { text: e.target.value })}
                                                                                                                                    className="w-full px-2 py-1 text-sm border border-gray-200 rounded"
                                                                                                                              />
                                                                                                                              <JoditEditor
                                                                                                                                    value={task.description}
                                                                                                                                    onChange={(content) => updateTask(task.id, { description: content })}
                                                                                                                                    className="w-full px-2 py-1 text-sm border border-gray-200 rounded h-20"
                                                                                                                              />
                                                                                                                              <button
                                                                                                                                    onClick={() => setEditingTask(null)}
                                                                                                                                    className="text-xs text-blue-600 hover:text-blue-800"
                                                                                                                              >
                                                                                                                                    Save
                                                                                                                              </button>
                                                                                                                        </div>
                                                                                                                  ) : (
                                                                                                                        <div
                                                                                                                              className="cursor-pointer"
                                                                                                                        >
                                                                                                                              <p className={`text-sm font-medium ${task.completed ? "text-gray-400 line-through" : "text-gray-900"
                                                                                                                                    }`}>
                                                                                                                                    {task.text}
                                                                                                                              </p>
                                                                                                                              {task.description && (
                                                                                                                                    <p className="text-xs text-gray-500 mt-1">
                                                                                                                                          {task.description}
                                                                                                                                    </p>
                                                                                                                              )}
                                                                                                                        </div>
                                                                                                                  )}
                                                                                                                  <div className="mt-2 flex flex-wrap gap-2">
                                                                                                                        {task.tags.map((tag, i) => (
                                                                                                                              <span
                                                                                                                                    key={i}
                                                                                                                                    className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                                                                                                                              >
                                                                                                                                    {tag}
                                                                                                                              </span>
                                                                                                                        ))}
                                                                                                                  </div>
                                                                                                                  <div className="mt-2 flex items-center space-x-2 text-xs text-gray-500">
                                                                                                                        <span className={getPriorityColor(task.priority)}>●</span>
                                                                                                                        <span>{task.priority}</span>
                                                                                                                        {task.dueDate && (
                                                                                                                              <>
                                                                                                                                    <span>•</span>
                                                                                                                                    <span>{format(new Date(task.dueDate), 'MMM d, yyyy')}</span>
                                                                                                                              </>
                                                                                                                        )}
                                                                                                                  </div>
                                                                                                            </div>
                                                                                                      </div>
                                                                                                      <div className="flex items-center space-x-2">
                                                                                                            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                                                                                                                  {getAssigneeInitials(task.assignedTo)}
                                                                                                            </div>
                                                                                                            <button
                                                                                                                  onClick={() => deleteTask(task.id)}
                                                                                                                  className="text-gray-400 hover:text-red-500 transition-colors"
                                                                                                            >
                                                                                                                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                                                                        <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                                                                                  </svg>
                                                                                                            </button>
                                                                                                            <button
                                                                                                                  onClick={() => setEditingTask(task.id === editingTask ? null : task.id)}
                                                                                                                  className="text-gray-400 hover:text-red-500 transition-colors"
                                                                                                            >
                                                                                                                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pen"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /></svg>
                                                                                                            </button>
                                                                                                      </div>
                                                                                                </div>
                                                                                          </div>
                                                                                    )}
                                                                              </Draggable>
                                                                        ))}
                                                                  {provided.placeholder}
                                                            </div>
                                                      </div>
                                                )}
                                          </Droppable>
                                    ))}
                              </div>
                        </DragDropContext>
                  </div>
            </div>
      )
}

export default TaskManagement
