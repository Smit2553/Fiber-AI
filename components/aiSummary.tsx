import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
});

interface IngredientSummaryProps {
  ingredients: string;
  allergens: string[];
}

const IngredientSummary: React.FC<IngredientSummaryProps> = ({
  ingredients,
  allergens,
}) => {
  const [summary, setSummary] = useState(ingredients ?? "");
  const [loading, setLoading] = useState(false);

  const handleGetSummary = async () => {
    setLoading(true);

    try {
      if (!ingredients) {
        setSummary("Please provide a list of ingredients.");
        setLoading(false);
        return;
      }
      const prompt = `Here is a list of ingredients: ${ingredients}. Please provide a summary of the good and bad aspects of this food item.`;
      const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
      });

      setSummary(chatCompletion.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching summary:", error);
      setSummary("An error occurred while fetching the summary.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetSummary();
  }, [ingredients]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loading}>Loading...</Text>
      ) : (
        <ScrollView style={styles.summaryContainer}>
          <Text style={styles.title}>Food Ingredient Summary</Text>
          <Text style={styles.summary}>{summary}</Text>
          <Text style={styles.allergens}>
            Allergens: {allergens.length > 0 ? allergens.join(", ") : "None"}
          </Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  summaryContainer: {
    marginTop: 20,
  },
  summary: {
    fontSize: 16,
    color: "#333",
  },
  loading: {
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
  allergens: {
    fontSize: 16,
    color: "#333",
    marginTop: 20,
    fontWeight: "bold",
  },
});

export default IngredientSummary;
