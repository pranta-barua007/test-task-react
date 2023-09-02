"use client"

import { useEffect, useRef, useState } from "react"
import styles from "./groupSelect.module.css"

import { type Sector } from "@/app/types/types"
import MultiSelect from "./MultiSelect"

type MultipleSelectProps = {
  multiple: true
  value: Sector[]
  onChange: (value: Sector[]) => void
}

type SingleSelectProps = {
  multiple?: false
  value?: Sector
  onChange: (value: Sector | undefined) => void
}

type SelectProps = {
  options: Sector[]
} & (SingleSelectProps | MultipleSelectProps)

export default function GroupSelect({ multiple, value, onChange, options }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  function clearOptions() {
    multiple ? onChange([]) : onChange(undefined)
  }

  function selectOption(option: Sector) {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter(o => o !== option))
      } else {
        onChange([...value, option])
      }
    } else {
      if (option !== value) onChange(option)
    }
  }

  function isOptionSelected(option: Sector) {
    return multiple ? value.includes(option) : option === value
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0)
  }, [isOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target != containerRef.current) return
      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen(prev => !prev)
          if (isOpen) selectOption(options[highlightedIndex])
          break
        case "ArrowUp":
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true)
            break
          }

          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1)
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue)
          }
          break
        }
        case "Escape":
          setIsOpen(false)
          break
      }
    }
    containerRef.current?.addEventListener("keydown", handler)

    return () => {
      containerRef.current?.removeEventListener("keydown", handler)
    }
  }, [isOpen, highlightedIndex, options])

  return (
    <div
      ref={containerRef}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen(prev => !prev)}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>
        {multiple
          ? value.map(v => (
              <button
                key={v.value}
                onClick={e => {
                  e.stopPropagation()
                  selectOption(v)
                }}
                className={styles["option-badge"]}
              >
                {v.name}
                <span className={styles["remove-btn"]}>&times;</span>
              </button>
            ))
          : value?.name}
      </span>
      <button
        onClick={e => {
          e.stopPropagation()
          clearOptions()
        }}
        className={styles["clear-btn"]}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map((option, index) => (
          <MultiSelect 
            key={option.value}
            option={option}
            index={index}
            highlightedIndex={highlightedIndex}
            onClickHandler={selectOption}
            setIsOpen={setIsOpen}
            isOptionSelected={isOptionSelected}
            setHighlightedIndex={setHighlightedIndex}
          />
        ))}
      </ul>
    </div>
  )
}