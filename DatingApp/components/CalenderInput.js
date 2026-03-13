import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";

import branding from "../style.js";

function CalenderInput({ date, onChangeDate }) {
    const [showDatePicker, setShowDatePicker] = useState(false);

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ];

    const day = String(date.getDate()).padStart(2, "0");
    const month = monthNames[date.getMonth()];
    const year = String(date.getFullYear());

    return (
        <View>
            <Pressable onPress={() => setShowDatePicker(true)} style={[branding.inputDate, {marginTop: 0}]}>
                <Text>{`${day} / ${month} / ${year}`}</Text>
            </Pressable>

            {showDatePicker && (
                <RNDateTimePicker
                    mode="date"
                    value={date}
                    onChange={(_event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) onChangeDate(selectedDate);
                    }}
                />
            )}
        </View>
    );
}

export default CalenderInput;