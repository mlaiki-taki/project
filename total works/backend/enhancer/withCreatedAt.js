const enhancer = () => (schema) => {

    const schemaDefinition = {
        created_at: {type: Date, default: new Date()}
    };
    schema.pre('save', function () {
        const now = new Date();
        this.created_at = this.created_at || now;
    });

    return schemaDefinition;
}


export default enhancer;