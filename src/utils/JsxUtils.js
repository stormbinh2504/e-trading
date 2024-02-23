class JsxUtils {

    static addClassCondition(baseClass, className, condition) {
        if (condition) {
            return this.joinClass(baseClass, className)
        }
        return baseClass;
    }

    static joinClass(baseClass, className) {
        return baseClass ? baseClass + ' ' + className : className;
    }

}

export default JsxUtils;