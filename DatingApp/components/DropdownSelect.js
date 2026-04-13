import {useEffect, useMemo, useState} from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import branding, { palette } from "../style";

function toLabel(option) {
    return typeof option === "string" ? option : option?.label ?? "";
}

function toValue(option) {
    return typeof option === "string" ? option : option?.value ?? option?.label ?? "";
}

function DropdownSelect({
                            title,
                            value,
                            options = [],
                            placeholder = "▼",
                            onSelect,
                            containerStyle,
                            inputStyle,
                            menuStyle,
                            optionStyle,
                            optionTextStyle,
                            titleStyle,
                            valueTextStyle,
                            onOpenChange,
                            maxVisibleOptions = 5,
                        }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {setIsOpen((prev) => !prev);};

    useEffect(() => {onOpenChange?.(isOpen);}, [isOpen, onOpenChange]);

    const normalizedOptions = useMemo(
        () => options.map((option) => ({ label: toLabel(option), value: toValue(option) })),
        [options]
    );

    return (
        <View style={[branding.dropdownContainer, isOpen && branding.dropdownOpenContainer, containerStyle]}>
        {!!title && <Text style={[branding.inputTextTitle, titleStyle]}>{title}</Text>}

            <Pressable onPress={toggleOpen} style={[branding.dropDownInput, inputStyle]}>
                <Text style={[valueTextStyle]}>{value || placeholder}</Text>
            </Pressable>

            {isOpen && (
                <View style={{ position: 'absolute', top: '90%', left: 0, right: 0, zIndex: 10, elevation: 10 }}>
                    <Pressable onPress={() => {}} style={{ flex: 1 }}>
                        <ScrollView
                            style={[branding.dropdownMenu, { maxHeight: maxVisibleOptions * 42 }, menuStyle]}
                            nestedScrollEnabled={true}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={true}
                            scrollEnabled={normalizedOptions.length > maxVisibleOptions}
                        >
                            {normalizedOptions.map((option) => (
                                <Pressable
                                    key={String(option.value)}
                                    onPress={() => {
                                        onSelect?.(option.value);
                                        setIsOpen(false);
                                    }}
                                    style={[branding.dropdownOption, optionStyle]}
                                >
                                    <Text style={optionTextStyle}>{option.label}</Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </Pressable>
                </View>
            )}
        </View>
    );
}

export default DropdownSelect;