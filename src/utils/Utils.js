
class Utils {
    static gqlHandelError = (err) => {
        // debugger
        const errors = err.graphQLErrors[0];
        if (errors) {
            const type = errors.message;
            if (type === "validation") {
                // debugger
                const validation = errors.validation
                debugger
                const keys = Object.keys(validation);
                let param = [];
                keys.map(key => {
                    if (validation[key]) {
                        param.push(`${validation[key].join('<br />')}`)
                    }

                })
                // debugger
                // alert(param.join(','));
                return param.join('<br />')
            }
        }
        // debugger
        // alert(type);
        return "اطلاعات وارد شده صحیح نمی  باشد";
    }
}

export default Utils;