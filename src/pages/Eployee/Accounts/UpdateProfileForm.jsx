

import { useState, useContext } from "react"
import { AuthContext } from "../../../context/UseContext/UseContext"

const UpdateProfileForm = ({ user }) => {
      const { updateUserProfile } = useContext(AuthContext)
      const [isLoading, setIsLoading] = useState(false)
      const [message, setMessage] = useState({ type: "", text: "" })
      const [formData, setFormData] = useState({
            name: user?.name || "",
            email: user?.email || "",
            designation: user?.designation || "",
            image: null,
      })
      const [previewImage, setPreviewImage] = useState(user?.image || null)

      const handleChange = (e) => {
            const { name, value } = e.target
            setFormData((prev) => ({ ...prev, [name]: value }))
      }

      const handleImageChange = (e) => {
            const file = e.target.files[0]
            if (file) {
                  setFormData((prev) => ({ ...prev, image: file }))

                  // Create preview URL
                  const reader = new FileReader()
                  reader.onloadend = () => {
                        setPreviewImage(reader.result)
                  }
                  reader.readAsDataURL(file)
            }
      }

      const handleSubmit = async (e) => {
            e.preventDefault()
            setIsLoading(true)
            setMessage({ type: "", text: "" })

            try {
                  // Create form data for API
                  const apiFormData = new FormData()
                  apiFormData.append("name", formData.name)
                  apiFormData.append("email", formData.email)
                  apiFormData.append("designation", formData.designation)
                  if (formData.image) {
                        apiFormData.append("image", formData.image)
                  }

                  // Call the update function from context
                  // This is a placeholder - you'll need to implement updateUserProfile in your AuthContext
                  const result = await updateUserProfile(apiFormData)

                  setMessage({
                        type: "success",
                        text: "Profile updated successfully!",
                  })
            } catch (error) {
                  console.error("Update failed:", error)
                  setMessage({
                        type: "error",
                        text: error.message || "Failed to update profile. Please try again.",
                  })
            } finally {
                  setIsLoading(false)
            }
      }

      return (
            <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Profile</h2>

                  {message.text && (
                        <div
                              className={`p-3 rounded ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                    }`}
                        >
                              {message.text}
                        </div>
                  )}

                  <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                              <div className="flex flex-col items-center">
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-md mb-4">
                                          {previewImage ? (
                                                <img
                                                      src={previewImage || "/placeholder.svg"}
                                                      alt="Profile preview"
                                                      className="w-full h-full object-cover"
                                                />
                                          ) : (
                                                <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-500 text-2xl font-bold">
                                                      {formData.name ? formData.name.charAt(0).toUpperCase() : "U"}
                                                </div>
                                          )}
                                    </div>

                                    <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md text-sm transition-colors">
                                          Change Photo
                                          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                                    </label>
                              </div>
                        </div>

                        <div className="md:w-2/3 space-y-4">
                              <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                          Full Name
                                    </label>
                                    <input
                                          type="text"
                                          id="name"
                                          name="name"
                                          value={formData.name}
                                          onChange={handleChange}
                                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                              </div>

                              <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                          Email Address
                                    </label>
                                    <input
                                          type="email"
                                          id="email"
                                          name="email"
                                          value={formData.email}
                                          onChange={handleChange}
                                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                              </div>

                              <div>
                                    <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-1">
                                          Designation
                                    </label>
                                    <input
                                          type="text"
                                          id="designation"
                                          name="designation"
                                          value={formData.designation}
                                          onChange={handleChange}
                                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                              </div>
                        </div>
                  </div>

                  <div className="flex justify-end">
                        <button
                              type="submit"
                              disabled={isLoading}
                              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-medium transition-colors disabled:opacity-50"
                        >
                              {isLoading ? "Updating..." : "Update Profile"}
                        </button>
                  </div>
            </form>
      )
}

export default UpdateProfileForm
