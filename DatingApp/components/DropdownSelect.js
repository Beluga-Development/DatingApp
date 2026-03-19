import {useEffect, useMemo, useState} from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
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
        <View style={[styles.container, isOpen && styles.openContainer, containerStyle]}>
            {!!title && <Text style={[branding.inputTextTitle, titleStyle]}>{title}</Text>}

            <Pressable onPress={toggleOpen} style={[branding.dropDownInput, inputStyle]}>
                <Text style={[valueTextStyle]}>{value || placeholder}</Text>
            </Pressable>

            {isOpen && (
                <ScrollView
                    style={[styles.menu, { maxHeight: maxVisibleOptions * 42 }, menuStyle]}
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
                            style={[styles.option, optionStyle]}
                        >
                            <Text style={optionTextStyle}>{option.label}</Text>
                        </Pressable>
                    ))}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    openContainer: {
        zIndex: 1,
        elevation: 1,
    },
    container: {
        position: "relative",
    },
    menu: {
        position: "absolute",
        top: "90%",
        left: 10,
        right: 10,
        backgroundColor: palette.secondary,
        borderRadius: 12,
        paddingVertical: 6,
    },
    option: {
        paddingVertical: 10,
        paddingHorizontal: 25,
    },
});

export default DropdownSelect;