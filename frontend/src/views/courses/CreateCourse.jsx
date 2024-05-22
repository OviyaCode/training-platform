import React from 'react'

const CreateCourse = () => {
  return (
    <div className="mx-3 bg-blue-50 w-[50%] p-3">
      <h3 className="text-center font-semibold my-4">Create Course</h3>
      <div className="flex flex-col">
        <div className="flex gap-4 items-center my-2">
          <label className="w-56">Course name</label>
          <input
            type="text"
            placeholder="enter course name..."
            className="px-2 py-1 w-full"
          />
        </div>
        <div className="flex gap-4 items-center my-2">
          <label className="w-56">Course description</label>
          <input
            type="email"
            placeholder="enter course description..."
            className="px-2 py-1 w-full"
          />
        </div>
        <div className="flex gap-4 items-center my-2">
          <label className="w-56">Course duration</label>
          <input
            type="email"
            placeholder="enter course duration..."
            className="px-2 py-1 w-full"
          />
        </div>
        <div className="flex gap-5">
          <button className="mt-5 text-white bg-green-500 px-3 py-1 rounded-md w-52 ">
            Create Course
          </button>
          <button className="mt-5 bg-gray-300 px-3 py-1 rounded-md w-52 ">
           Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateCourse