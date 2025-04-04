const PersonForm = ({ handleNameChange, handlePhoneChange, newName, newPhone, handleAddPerson }) => {
    return (
        <form onSubmit={handleAddPerson}>
            <input
                placeholder="New name"
                value={newName}
                onChange={handleNameChange}
            />

            <input
                placeholder="New phone number"
                value={newPhone}
                onChange={handlePhoneChange}
            />
            <br /><br />

            {/* Move button inside the form */}
            <button type="submit">Add</button>
        </form>
    );
}

export default PersonForm;
