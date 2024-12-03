'use client'

import { useState } from "react";
import { 
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function JokeCard({ profileId }: { profileId: number }) {
    const [state, setState] = useState({
        loading: false,
        joke: '',
        jokeId: 0,
        rating: 5,
        rated: false,
    });

    const updateState = (updates: Partial<typeof state>) => {
        setState((prev) => ({ ...prev, ...updates }));
    };

    const fetchJoke = async () => {
        updateState({ loading: true, joke: '', jokeId: 0, rating: 0, rated: false });

        try {
            const res = await fetch(`/api/get-unrated-joke?user_id=${profileId}`, {
                method: 'GET',
            });

            const jokeData = await res.json();
            console.log('Predicted Rating: ', jokeData.joke.predicted_rating);
            updateState({
                jokeId: jokeData.joke.jokeid,
                joke: jokeData.joke.joketext,
                loading: false,
            });
        } catch (error) {
            console.error("Error fetching joke:", error);
            updateState({ loading: false });
        }
    };

    const rateJoke = async () => {
        try {
            const res = await fetch(`/api/rate-joke`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: profileId,
                    joke_id: state.jokeId,
                    rating: state.rating,
                }),
            });

            const result = await res.json();
            console.log('Result: ', result);
            if (!result.error) {
                updateState({ rated: true });
                console.log(`Rated joke ${state.jokeId}: ${state.rating}/5`);
            }
        } catch (error) {
            console.error("Error rating joke:", error);
        }
    };

    return (
        <Card className="p-4 mt-8 w-1/2">
            <CardHeader>
                <CardTitle>Get a random joke!</CardTitle>
            </CardHeader>
            <CardContent>
                <Button onClick={fetchJoke}>New joke</Button>
                {state.rated ? (
                    <div className="pt-8">
                        <p>Thank you for rating!</p>
                    </div>
                ) : (
                    <div>
                        <div className="pt-8">
                            {state.loading ? (
                                <Skeleton className="w-3/4 h-6" />
                            ) : (
                                state.joke
                            )}
                        </div>
                        {state.joke && (
                            <div className="flex gap-16 pt-8">
                                <div className="flex space-x-2">
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <Button
                                            key={value}
                                            variant={state.rating === value ? 'default' : 'outline'}
                                            onClick={() => updateState({ rating: value })}
                                        >
                                            {value}
                                        </Button>
                                    ))}
                                </div>
                                <Button onClick={rateJoke} variant="outline">
                                    Save
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
