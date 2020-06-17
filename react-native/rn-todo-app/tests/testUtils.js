import checkPropTypes from "check-prop-types";

export const findByTestAttr = (
    wrapper,
    val,
    nameAttr = "testID" /* "data-test" */
) => wrapper.find(`[${nameAttr}="${val}"]`);

export const checkProps = (component, conformingProps) => {
    const propError = checkPropTypes(
        component.propTypes,
        conformingProps,
        "prop",
        component.name,
        () => {}
    );

    expect(propError).toBeUndefined();
};

export const getCount = (wrapper) => {
    let count = wrapper.length;
    let node = wrapper.children();
    while (node && node?.length > 0) {
        count += node.length;
        node = node?.children();
    };
    return count;
};
