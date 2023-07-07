"use client";

import { Button } from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { differenceInDays } from "date-fns";

import { Controller, useForm } from "react-hook-form";

interface Props {
  tripId: string;
  tripStartDate: Date;
  tripEndDate: Date;
  maxGuests: number;
  pricePerDay: number;
}

interface FormData {
  startDate: Date | null;
  endDate: Date | null;
  guests: number;
}

export function TripReservation({
  tripStartDate,
  tripEndDate,
  maxGuests,
  pricePerDay,
  tripId,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    const response = await fetch("http://localhost:3000/api/trips/check", {
      method: "POST",
      body: Buffer.from(
        JSON.stringify({
          startDate: data.startDate,
          endDate: data.endDate,
          tripId,
        })
      ),
    });

    const res = response.json();

    console.log({ res });
  }

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  return (
    <div className="flex flex-col px-5">
      <div className="flex gap-4">
        <Controller
          name="startDate"
          rules={{
            required: { value: true, message: "Data inicial é obrigatória." },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              placeholderText="Data de Início"
              error={!!errors.startDate}
              errorMessage={errors.startDate?.message}
              onChange={field.onChange}
              selected={field.value}
              className="w-full"
              minDate={tripStartDate}
            />
          )}
        />

        <Controller
          name="endDate"
          rules={{
            required: { value: true, message: "Data final é obrigatória." },
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              placeholderText="Data Final"
              error={!!errors.endDate}
              errorMessage={errors.endDate?.message}
              onChange={field.onChange}
              selected={field.value}
              className="w-full"
              maxDate={tripEndDate}
              minDate={startDate ?? tripStartDate}
            />
          )}
        />
      </div>

      <Input
        {...register("guests", {
          required: {
            value: true,
            message: "Número de hóspedes é obrigatório.",
          },
        })}
        placeholder={`Número de hóspedes (max: ${maxGuests})`}
        className="mt-4"
        error={!!errors?.guests}
        errorMessage={errors.guests?.message}
      />

      <div className="flex justify-between mt-3">
        <p className="font-medium text-sm text-primaryDarker">Total: </p>
        <p className="font-medium text-sm text-primaryDarker">
          {startDate && endDate
            ? `R$${differenceInDays(endDate, startDate) * pricePerDay}`
            : "R$0"}
        </p>
      </div>

      <div className="pb-10 border-b border-grayLighter w-full">
        <Button
          onClick={() => handleSubmit(onSubmit)()}
          className="mt-4 w-full"
        >
          Reservar agora
        </Button>
      </div>
    </div>
  );
}
