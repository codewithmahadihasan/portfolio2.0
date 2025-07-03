import { useState, useEffect, useRef, useContext } from "react"
import { useQuery } from "@tanstack/react-query"
import { ChevronDown, Search, X } from 'lucide-react'
import { AuthContext } from "../../../context/UseContext/UseContext"
import { base_url } from "../../../layout/Title"
import Swal from "sweetalert2"

// Example: Replace this with your real lookup/API call
const emailToCompany = {
      "alice@example.com": "Acme Corp",
      "bob@example.com": "Beta Ltd"
}

// Fetch countries from REST Countries API with additional data
const fetchCountries = async () => {
      const res = await fetch("https://restcountries.com/v3.1/independent?status=true&fields=name,cca2,idd,flag")
      if (!res.ok) throw new Error("Failed to fetch countries")
      const data = await res.json()

      // Transform and sort data
      return data
            .map(country => ({
                  name: country.name.common,
                  code: country.cca2,
                  flag: country.flag,
                  dialCode: country.idd?.root ?
                        `${country.idd.root}${country.idd.suffixes?.[0] || ''}` :
                        ''
            }))
            .filter(country => country.dialCode) // Only include countries with dial codes
            .sort((a, b) => a.name.localeCompare(b.name))
}

// Searchable Country Dropdown Component
function CountryDropdown({ value, onChange, countries, loading, error }) {
      const [isOpen, setIsOpen] = useState(false)
      const [searchTerm, setSearchTerm] = useState("")
      const dropdownRef = useRef(null)

      const filteredCountries = countries.filter(country =>
            country.name.toLowerCase().includes(searchTerm.toLowerCase())
      )

      useEffect(() => {
            function handleClickOutside(event) {
                  if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                        setIsOpen(false)
                        setSearchTerm("")
                  }
            }

            document.addEventListener("mousedown", handleClickOutside)
            return () => document.removeEventListener("mousedown", handleClickOutside)
      }, [])

      const selectedCountry = countries.find(c => c.name === value)

      return (
            <div className="relative" ref={dropdownRef}>
                  <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        disabled={loading}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 flex items-center justify-between"
                  >
                        <span className="flex items-center gap-2">
                              {selectedCountry ? (
                                    <>
                                          <span className="text-lg">{selectedCountry.flag}</span>
                                          <span>{selectedCountry.name}</span>
                                    </>
                              ) : (
                                    <span className="text-gray-400">Select Country</span>
                              )}
                        </span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                        <div className="absolute z-50 w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-hidden">
                              <div className="p-3 border-b border-gray-600">
                                    <div className="relative">
                                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                          <input
                                                type="text"
                                                placeholder="Search countries..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="w-full bg-gray-600 border border-gray-500 rounded px-10 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                          />
                                          {searchTerm && (
                                                <button
                                                      onClick={() => setSearchTerm("")}
                                                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                                >
                                                      <X className="w-4 h-4" />
                                                </button>
                                          )}
                                    </div>
                              </div>
                              <div className="max-h-48 overflow-y-auto">
                                    {loading ? (
                                          <div className="p-3 text-gray-400">Loading countries...</div>
                                    ) : error ? (
                                          <div className="p-3 text-red-500">Failed to load countries</div>
                                    ) : filteredCountries.length === 0 ? (
                                          <div className="p-3 text-gray-400">No countries found</div>
                                    ) : (
                                          filteredCountries.map((country) => (
                                                <button
                                                      key={country.code}
                                                      type="button"
                                                      onClick={() => {
                                                            onChange(country.name)
                                                            setIsOpen(false)
                                                            setSearchTerm("")
                                                      }}
                                                      className="w-full px-4 py-2 text-left hover:bg-gray-600 flex items-center gap-3 text-white"
                                                >
                                                      <span className="text-lg">{country.flag}</span>
                                                      <span>{country.name}</span>
                                                </button>
                                          ))
                                    )}
                              </div>
                        </div>
                  )}
            </div>
      )
}

// Phone Number Input with Country Code
function PhoneInput({ value, onChange, countries }) {
      const [selectedCountry, setSelectedCountry] = useState(countries[0] || null)
      const [phoneNumber, setPhoneNumber] = useState("")
      const [isCountryOpen, setIsCountryOpen] = useState(false)
      const [searchTerm, setSearchTerm] = useState("")
      const dropdownRef = useRef(null)

      // Parse existing phone number on mount
      useEffect(() => {
            if (value && countries.length > 0) {
                  // Try to find matching country code
                  const matchingCountry = countries.find(country =>
                        value.startsWith(country.dialCode)
                  )
                  if (matchingCountry) {
                        setSelectedCountry(matchingCountry)
                        setPhoneNumber(value.replace(matchingCountry.dialCode, "").trim())
                  } else {
                        setPhoneNumber(value)
                  }
            }
      }, [value, countries])

      // Update parent when values change
      useEffect(() => {
            if (selectedCountry) {
                  const fullNumber = phoneNumber ? `${selectedCountry.dialCode} ${phoneNumber}` : ""
                  onChange(fullNumber)
            }
      }, [selectedCountry, phoneNumber, onChange])

      const filteredCountries = countries.filter(country =>
            country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            country.dialCode.includes(searchTerm)
      )

      useEffect(() => {
            function handleClickOutside(event) {
                  if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                        setIsCountryOpen(false)
                        setSearchTerm("")
                  }
            }

            document.addEventListener("mousedown", handleClickOutside)
            return () => document.removeEventListener("mousedown", handleClickOutside)
      }, [])

      return (
            <div className="flex">
                  <div className="relative" ref={dropdownRef}>
                        <button
                              type="button"
                              onClick={() => setIsCountryOpen(!isCountryOpen)}
                              className="bg-gray-700 border border-gray-600 border-r-0 rounded-l-lg px-3 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 flex items-center gap-2 min-w-[120px]"
                        >
                              {selectedCountry ? (
                                    <>
                                          <span className="text-lg">{selectedCountry.flag}</span>
                                          <span className="text-sm">{selectedCountry.dialCode}</span>
                                    </>
                              ) : (
                                    <span className="text-gray-400 text-sm">Code</span>
                              )}
                              <ChevronDown className={`w-3 h-3 transition-transform ${isCountryOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isCountryOpen && (
                              <div className="absolute z-50 left-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg w-80 max-h-60 overflow-hidden">
                                    <div className="p-3 border-b border-gray-600">
                                          <div className="relative">
                                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <input
                                                      type="text"
                                                      placeholder="Search countries..."
                                                      value={searchTerm}
                                                      onChange={(e) => setSearchTerm(e.target.value)}
                                                      className="w-full bg-gray-600 border border-gray-500 rounded px-10 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                          </div>
                                    </div>
                                    <div className="max-h-48 overflow-y-auto">
                                          {filteredCountries.map((country) => (
                                                <button
                                                      key={country.code}
                                                      type="button"
                                                      onClick={() => {
                                                            setSelectedCountry(country)
                                                            setIsCountryOpen(false)
                                                            setSearchTerm("")
                                                      }}
                                                      className="w-full px-4 py-2 text-left hover:bg-gray-600 flex items-center gap-3 text-white"
                                                >
                                                      <span className="text-lg">{country.flag}</span>
                                                      <span className="flex-1">{country.name}</span>
                                                      <span className="text-sm text-gray-400">{country.dialCode}</span>
                                                </button>
                                          ))}
                                    </div>
                              </div>
                        )}
                  </div>

                  <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Phone number"
                        className="flex-1 bg-gray-700 border border-gray-600 rounded-r-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
            </div>
      )
}

export default function MeetingModal({
      open,
      onClose,
      onSave,
      row,
      statusOptions,
      mediumOptions,
      refetch
}) {
      const { user } = useContext(AuthContext);
      const [formData, setFormData] = useState({
            clientName: "",
            linkedin_link: "",
            country: "",
            zone: "",
            company: "",
            industry: "",
            companySize: "",
            cOwner: user?.name,
            source: "",
            email: "",
            phone: "",
            lastChat: "",
            meetingDate: "",
            time: "",
            status: "",
            medium: "",
            meeting_number: "",
            reason: ""

      })

      // Track if the company name was set by the user
      const [companyManuallyEdited, setCompanyManuallyEdited] = useState(false)

      useEffect(() => {
            if (row) {
                  setFormData(row)
                  setCompanyManuallyEdited(false)
            } else {
                  setFormData({
                        clientName: "",
                        linkedin_link: "",
                        country: "",
                        zone: "",
                        company: "",
                        industry: "",
                        companySize: "",
                        cOwner: "",
                        source: "",
                        email: "",
                        phone: "",
                        lastChat: "",
                        meetingDate: "",
                        time: "",
                        status: "",
                        medium: "",
                        meeting_number: "",
                        reason: "",

                  })
                  setCompanyManuallyEdited(false)
                  setFormData((prev) => ({ ...prev, cOwner: user?.name }))

            }
      }, [row, user])

      const { data: countryList = [], isLoading: countryLoading, error: countryError } = useQuery({
            queryKey: ["countries"],
            queryFn: fetchCountries
      })

      const handleChange = (e) => {
            const { name, value } = e.target

            // When user changes the Company field, mark as manually edited
            if (name === "company") {
                  setCompanyManuallyEdited(true)
            }

            // When user changes the Email field
            if (name === "email" && !companyManuallyEdited) {
                  // If the email is in the lookup, auto-fill company
                  const autoCompany = emailToCompany[value.trim().toLowerCase()] || ""
                  setFormData((prev) => ({
                        ...prev,
                        [name]: value,
                        company: autoCompany
                  }))
                  return
            }

            // Normal change
            setFormData((prev) => ({
                  ...prev,
                  [name]: value
            }))
      }

      const handleCountryChange = (countryName) => {
            setFormData(prev => ({
                  ...prev,
                  country: countryName
            }))
      }

      const handlePhoneChange = (phoneValue) => {
            setFormData(prev => ({
                  ...prev,
                  phone: phoneValue
            }))
      }

      const handleSubmit = (e) => {
            e.preventDefault()
            const { clientName, linkedin_link, country, zone, company, industry, companySize, cOwner, source, email, phone, lastChat, meetingDate, time, status, medium, meeting_number, reason } = formData
            const data = {
                  clientName,
                  linkedin_link,
                  country,
                  zone,
                  company,
                  industry,
                  companySize,
                  cOwner,
                  source,
                  email,
                  phone,
                  lastChat,
                  meetingDate,
                  time,
                  status,
                  medium,
                  meeting_number,
                  reason
            }
            if (row) {
                  fetch(`${base_url}/meeting/edit-client-meeting?client_meeting_id=${row._id}`, {
                        method: "PUT",
                        headers: {
                              "content-type": "application/json",
                              author: "bright_future_soft",
                        },
                        body: JSON.stringify(data)
                  })
                        .then(res => res.json())
                        .then(data => {
                              if (data.success) {
                                    Swal.fire({
                                          title: "Success!",
                                          text: data.message,
                                          icon: "success",
                                          confirmButtonText: "OK"
                                    })
                                    onClose()
                                    refetch()
                              }
                        })
            } else {
                  fetch(`${base_url}/meeting/add-client-meeting`, {
                        method: "POST",
                        headers: {
                              "content-type": "application/json",
                              author: "bright_future_soft",
                        },
                        body: JSON.stringify(data)
                  })
                        .then(res => res.json())
                        .then(data => {
                              if (data.success) {
                                    Swal.fire({
                                          title: "Success!",
                                          text: data.message,
                                          icon: "success",
                                          confirmButtonText: "OK"
                                    })
                                    onClose()
                                    refetch()
                              }
                        })
            }
      }

      if (!open) return null

      return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-full max-w-4xl ">
                        <div className="p-6 border-b border-gray-700">
                              <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-white">{row ? "Edit Meeting" : "Add New Meeting"}</h2>
                                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors duration-200">
                                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                          </svg>
                                    </button>
                              </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 ">
                              <div className="max-h-[65vh] overflow-y-auto p-3">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                          <div className="space-y-4">
                                                <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Prospect Information</h3>

                                                <div>
                                                      <label className="block text-sm font-medium text-gray-300 mb-2">Client Name *</label>
                                                      <input
                                                            type="text"
                                                            name="clientName"
                                                            value={formData.clientName}
                                                            onChange={handleChange}
                                                            required
                                                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                            placeholder="Enter client name"
                                                      />
                                                </div>

                                                <div>
                                                      <label className="block text-sm font-medium text-gray-300 mb-2">Country</label>
                                                      <CountryDropdown
                                                            value={formData.country}
                                                            onChange={handleCountryChange}
                                                            countries={countryList}
                                                            loading={countryLoading}
                                                            error={countryError}
                                                      />
                                                </div>

                                                <div>
                                                      <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                                                      <input
                                                            type="text"
                                                            name="company"
                                                            value={formData.company}
                                                            onChange={handleChange}
                                                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                            placeholder="Company name"
                                                      />
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                      <div>
                                                            <label className="block text-sm font-medium text-gray-300 mb-2">Industry</label>
                                                            <input
                                                                  type="text"
                                                                  name="industry"
                                                                  value={formData.industry}
                                                                  onChange={handleChange}
                                                                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                                  placeholder="Industry"
                                                            />
                                                      </div>
                                                      <div>
                                                            <label className="block text-sm font-medium text-gray-300 mb-2">Company Size</label>
                                                            <select
                                                                  name="companySize"
                                                                  value={formData.companySize}
                                                                  onChange={handleChange}
                                                                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                            >
                                                                  <option value="">Select Size</option>
                                                                  <option value="1-10">1-10</option>
                                                                  <option value="11-50">11-50</option>
                                                                  <option value="51-200">51-200</option>
                                                                  <option value="201-500">201-500</option>
                                                                  <option value="500+">500+</option>
                                                            </select>
                                                      </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                      <div>
                                                            <label className="block text-sm font-medium text-gray-300 mb-2">Source</label>
                                                            <select
                                                                  name="source"
                                                                  value={formData.source}
                                                                  onChange={handleChange}
                                                                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                            >
                                                                  <option value="">Select Source</option>
                                                                  <option value="Mahadi">Mahadi - (Sumon)</option>
                                                                  <option value="Jakir">Jakir - (Sumon)</option>
                                                                  <option value="Imran">Imran - (Sumon)</option>
                                                                  <option value="Shamim">Shamim - (Sumon)</option>
                                                                  <option value="Fahim">Fahim - (Sumon)</option>
                                                                  <option value="Hossen">Hossen - (Sumon)</option>
                                                                  <option value="Regita">Regita - (Nowshin)</option>
                                                                  <option value="Nowshin">Nowshin - (Nowshin)</option>
                                                                  <option value="Fahim (JP)">Fahim (JP) - (Nowshin)</option>
                                                                  <option value="Sajid">Sajid - (Nowshin)</option>
                                                                  <option value="Nusrat">Nusrat - (Nowshin)</option>
                                                                  <option value="Sadika">Sadika - (Nowshin)</option>
                                                                  <option value="Naima">Naima - (Nowshin)</option>
                                                                  <option value="Maruf">Maruf - (Nowshin)</option>
                                                            </select>
                                                      </div>
                                                      <div>
                                                            <label className="block text-sm font-medium text-gray-300 mb-2">Meeting Number</label>
                                                            <input
                                                                  type="number"
                                                                  name="meeting_number"
                                                                  value={formData.meeting_number}
                                                                  onChange={handleChange}
                                                                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                                  placeholder="Meeting Number"
                                                            />
                                                      </div>
                                                </div>
                                          </div>

                                          {/* Contact & Meeting Information */}
                                          <div className="space-y-4">
                                                <h3 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                                                      Contact & Meeting Details
                                                </h3>

                                                <div>
                                                      <label className="block text-sm font-medium text-gray-300 mb-2">Client Email</label>
                                                      <input
                                                            type="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                            placeholder="email@example.com"
                                                      />
                                                </div>

                                                <div>
                                                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                                                      <PhoneInput
                                                            value={formData.phone}
                                                            onChange={handlePhoneChange}
                                                            countries={countryList}
                                                      />
                                                </div>

                                                <div>
                                                      <label className="block text-sm font-medium text-gray-300 mb-2">Last Chat</label>
                                                      <input
                                                            type="date"
                                                            name="lastChat"
                                                            value={formData.lastChat}
                                                            onChange={handleChange}
                                                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                      />
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                      <div>
                                                            <label className="block text-sm font-medium text-gray-300 mb-2">Meeting Date</label>
                                                            <input
                                                                  type="date"
                                                                  name="meetingDate"
                                                                  value={formData.meetingDate}
                                                                  onChange={handleChange}
                                                                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                            />
                                                      </div>
                                                      <div>
                                                            <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
                                                            <input
                                                                  type="time"
                                                                  name="time"
                                                                  value={formData.time}
                                                                  onChange={handleChange}
                                                                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                            />
                                                      </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                      <div>
                                                            <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                                                            <select
                                                                  name="status"
                                                                  value={formData.status}
                                                                  onChange={handleChange}
                                                                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                            >
                                                                  <option value="">Select Status</option>
                                                                  {statusOptions.map((option) => (
                                                                        <option key={option} value={option}>
                                                                              {option}
                                                                        </option>
                                                                  ))}
                                                            </select>
                                                      </div>
                                                      <div>
                                                            <label className="block text-sm font-medium text-gray-300 mb-2">Medium</label>
                                                            <select
                                                                  name="medium"
                                                                  value={formData.medium}
                                                                  onChange={handleChange}
                                                                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                            >
                                                                  <option value="">Select Medium</option>
                                                                  {mediumOptions.map((option) => (
                                                                        <option key={option} value={option}>
                                                                              {option || "None"}
                                                                        </option>
                                                                  ))}
                                                            </select>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>

                                    <div>
                                          <label className="block text-sm font-medium text-gray-300 mb-2 mt-2">Linkedin Profile Link</label>
                                          <input
                                                type="text"
                                                name="linkedin_link"
                                                value={formData.linkedin_link}
                                                placeholder="Linkedin Profile Link"
                                                onChange={handleChange}
                                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                          />
                                    </div>
                                    <div>
                                          <label className="block text-sm font-medium text-gray-300 mb-2 mt-2">Reason</label>
                                          <textarea
                                                name="reason"
                                                value={formData.reason}
                                                onChange={handleChange}
                                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                          />
                                    </div>
                              </div>

                              <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-700">
                                    <button
                                          type="button"
                                          onClick={onClose}
                                          className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
                                    >
                                          Cancel
                                    </button>
                                    <button
                                          type="submit"
                                          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium shadow-lg"
                                    >
                                          {row ? "Update Meeting" : "Create Meeting"}
                                    </button>
                              </div>
                        </form>
                  </div>
            </div>
      )
}
