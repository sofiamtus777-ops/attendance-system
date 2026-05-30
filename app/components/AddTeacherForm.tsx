"use client";

import { useState } from "react";

export default function AddTeacherForm({
  onAdded
}: {
  onAdded: () => void
}) {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [subject, setSubject] =
    useState("");

  async function handleSubmit(e: any) {

    e.preventDefault();

    const res = await fetch(
      "/api/teachers",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({

          name,
          email,
          password,
          subject
        })
      }
    );

    const data =
      await res.json();

    if (data.success) {

      setName("");
      setEmail("");
      setPassword("");
      setSubject("");

      onAdded();

      alert(
        "Викладача додано"
      );

    } else {

      alert(
        "Помилка при додаванні"
      );
    }
  }

  return (

    <form
      onSubmit={handleSubmit}

      style={{
        background: "white",
        padding: 20,
        marginTop: 20,
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        gap: 15
      }}
    >

      <h3>
        Додати викладача
      </h3>

      <input
        type="text"

        placeholder="Імʼя"

        value={name}

        onChange={(e) =>
          setName(e.target.value)
        }

        required

        style={{
          padding: 12,
          borderRadius: 10
        }}
      />

      <input
        type="email"

        placeholder="Email"

        value={email}

        onChange={(e) =>
          setEmail(e.target.value)
        }

        required

        style={{
          padding: 12,
          borderRadius: 10
        }}
      />

      <input
        type="password"

        placeholder="Пароль"

        value={password}

        onChange={(e) =>
          setPassword(e.target.value)
        }

        required

        style={{
          padding: 12,
          borderRadius: 10
        }}
      />

      <input
        type="text"

        placeholder="Предмет"

        value={subject}

        onChange={(e) =>
          setSubject(e.target.value)
        }

        required

        style={{
          padding: 12,
          borderRadius: 10
        }}
      />

      <button
        type="submit"

        style={{
          padding: 12,
          border: "none",
          borderRadius: 10,
          background: "#d4a373",
          cursor: "pointer"
        }}
      >
        Додати
      </button>

    </form>
  );
}