'use client'

import React, { useState } from "react";

import { getUsers } from "@/services/users";
import { getLongFullNameUsers } from "@/util/userUtils";

const getLongNamesPercentage = (users) => {
  const longNameUsers = getLongFullNameUsers(users, 5)
  const percentage = longNameUsers.length / users.length * 100
  return percentage.toFixed(2)
}

const renderImages = (users) => {
  return users.map((user) => (
    <div>
      <img src={user.avatar} alt="not found avatar" />
    </div>
  ))
}

export default function User () {
  const [users, setUsers] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const prevPage = () => {
    setPage(page - 1)
    setUsers(null)
  }

  const nextPage = () => {
    setPage(page + 1)
    setUsers(null)
  }

  !users && getUsers(page)
    .then((obj) => {
      setUsers(obj.data)
      setTotalPages(obj.total_pages)
    })
    .catch((e) => console.error(`${e.name}: ${e.message}`))

  return (
    <div>
      <div>
        <button onClick={prevPage} disabled={page <= 1} className="border">prev</button>
        <span className="mx-2">page {page} of {totalPages}</span>
        <button onClick={nextPage} disabled={page >= totalPages} className="border">next</button>
      </div>
      <h2>{users ? `Long name percentage: ${getLongNamesPercentage(users)}%` : 'Waiting for users...' }</h2>
      {users && <div>{renderImages(users)}</div>}
    </div>
  )
}