const enhancer = () => (schema) => {
    const schemaDefinition = {
        updated_at: {type: Date}
    };

    schema.pre('validate', function () {
        const now = new Date();
        this.updated_at = now;
    });
    return schemaDefinition;
}


export default enhancer;