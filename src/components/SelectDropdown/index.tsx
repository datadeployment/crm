import React from 'react'
import Select from 'react-select'
import AsyncSelect from 'react-select/async';

const SelectDropdown = (props: any) => {
    const { required, labeltext, asyncSelect } = props
    const styles = {
        control: (baseStyles: any, state: any) => ({
            ...baseStyles,
            borderColor: '#e1e1e1',
            backgroundColor: "#fbfbfb",
            fontSize: "16px",
            padding: "3px"
        }),
        option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {

            return {
                ...styles,
                // backgroundColor: isSelected && "var(--primary1)"
                color: isSelected && "white"
            };
        },
        // multiValue: (base: any, state: any) => {
        //     return state.data.isFixed ? { ...base, backgroundColor: 'red' } : base;
        // },
        // multiValueLabel: (base: any, state: any) => {
        //     return state.data.isFixed
        //         ? { ...base, fontWeight: 'bold', color: 'white', paddingRight: 6 }
        //         : base;
        // },
        // multiValueRemove: (base: any, state: any) => {
        //     return state.data.isFixed ? { ...base, display: 'none' } : base;
        // },
    };

    const theme = (theme: any) => ({
        ...theme,
        colors: {
            ...theme.colors,
            primary25: "var(--primary4)",
            primary: "var(--primary1)"
        }
    })
    return (<>
        {labeltext && (<>
            <label htmlFor={labeltext} className='cursor-pointer block text-xs mb-1'>{labeltext} <span className={`${required ? 'inline' : "hidden"} text-red-600 font-medium text-sm leading-none`}>*</span></label>
        </>)}
        {asyncSelect === true ? (
            <AsyncSelect
                theme={theme}
                styles={styles}

                {...props}
            />
        ) : (
            <Select
                // className="basic-single"
                // classNamePrefix="select"
                // defaultValue={colourOptions[0]}
                // isDisabled={isDisabled}
                // isLoading={isLoading}
                // isClearable={isClearable}
                // isRtl={isRtl}
                // isSearchable={isSearchable}
                // name="color"
                theme={theme}
                styles={styles}
                {...props}
            />
        )}
    </>
    )
}

export default SelectDropdown
