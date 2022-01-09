import React from 'react'

const ThoughtForm = ({  onFormSubmit, newThought, setNewThought }) => {

    return (
        <form onSubmit={onFormSubmit} className="form-container">
        <label htmlFor="newThought" className="label-form">Type your thought</label>
        <textarea
        className="thought-input"
        id ="newThought"
        type="text" 
        value={newThought} 
        onChange={(event) => setNewThought(event.target.value)}
        />
        <div className="button">
        <button disabled={newThought.length < 5 || newThought.length > 140} type="submit" className="submit-button">
            Send happy thought!
        </button>
        <p className="character-counter">{newThought.length}/140</p>
        </div>

        {newThought.length <5 && (
            <p className="error-message"> Your message must be 5 characters long</p>
        )}
            {newThought.length >140 && (
            <p className="error-message"> Your message must be less thann 140 characters long</p>
        )}
    </form>
    )
}

export default ThoughtForm