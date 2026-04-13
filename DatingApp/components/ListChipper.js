import { useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { Chip, TouchableRipple } from "react-native-paper";
import branding, { palette } from "../style";

function ListChipper({
                         title,
                         items,
                         options,
                         onAdd,
                         onRemove,
                         maxVisible = 5,
                         containerStyle,
                         titleStyle,
                         chipContainerStyle,
                         chipStyle,
                         chipTextStyle,
                         addButtonStyle,
                         addButtonTextStyle,
                         searchContainerStyle,
                         searchInputStyle,
                         cancelStyle,
                         optionStyle,
                         optionTextStyle,
                     }) {

    const [showSearch, setShowSearch] = useState(false);
    const [query, setQuery] = useState("");

    const filteredOptions = (options || []).filter((option) => {
        const notSelected = !items.some((i) => i.id === option.id);
        const search = query.trim().toLowerCase();
        const matchesName = option.name.toLowerCase().includes(search);
        const matchesType = option.type?.toLowerCase().includes(search);
        return notSelected && (matchesName || matchesType);
    });

    const handleAdd = (item) => {
        onAdd(item);
        setQuery("");
        setShowSearch(false);
    };

    return (
        <View style={containerStyle}>
            {!!title && <Text style={[branding.inputTextTitle, titleStyle]}>{title}</Text>}

            <View style={[{ flexDirection: "row", flexWrap: "wrap", marginHorizontal: 10 }, chipContainerStyle]}>
                {items.map((item) => (
                    <Chip
                        key={item.id}
                        onClose={() => onRemove(item)}
                        style={[{
                            marginRight: 8,
                            marginBottom: 8,
                            borderRadius: 36,
                            backgroundColor: palette.primary,
                        }, chipStyle]}
                        textStyle={[{ color: palette.text }, chipTextStyle]}
                    >
                        {item.name}
                    </Chip>
                ))}
            </View>

            {!showSearch ? (
                <TouchableRipple
                    onPress={() => setShowSearch(true)}
                    style={[{
                        marginLeft: 12,
                        width: 35,
                        height: 35,
                        borderRadius: 36,
                        backgroundColor: palette.black,
                        alignItems: "center",
                        justifyContent: "center",
                    }, addButtonStyle]}
                >
                    <Text style={[{ color: palette.white, fontSize: 36, lineHeight: 30 }, addButtonTextStyle]}>+</Text>
                </TouchableRipple>
            ) : (
                <View style={[{ marginHorizontal: 10, marginTop: 8 }, searchContainerStyle]}>
                    <FlatList
                        data={filteredOptions.slice(0, maxVisible)}
                        keyExtractor={(item) => String(item.id)}
                        keyboardShouldPersistTaps="handled"
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <TouchableRipple
                                onPress={() => handleAdd(item)}
                                style={[{
                                    backgroundColor: palette.secondary,
                                    paddingVertical: 6,
                                    paddingHorizontal: 8,
                                    borderRadius: 36,
                                    marginBottom: 6,
                                    alignSelf: "flex-start",
                                }, optionStyle]}
                            >
                                <Text style={optionTextStyle}>{item.name}</Text>
                            </TouchableRipple>
                        )}
                    />

                    <TextInput
                        value={query}
                        onChangeText={setQuery}
                        placeholder="Search interests"
                        autoFocus
                        style={[{
                            paddingHorizontal: 15,
                            borderRadius: 36,
                            backgroundColor: palette.accent,
                        }, searchInputStyle]}
                    />
                    <Pressable
                        onPress={() => {
                            setQuery("");
                            setShowSearch(false);
                        }}
                        style={[{ marginBottom: 8, marginLeft: 15 }, cancelStyle]}
                    >
                        <Text style={{ color: palette.contrast }}>Cancel</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}

export default ListChipper;
