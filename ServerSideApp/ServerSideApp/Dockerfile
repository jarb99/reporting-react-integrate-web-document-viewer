FROM mcr.microsoft.com/dotnet/aspnet:6.0-nanoserver-1809 AS base
WORKDIR /app
EXPOSE 62359

ENV ASPNETCORE_URLS=http://+:62359

FROM mcr.microsoft.com/dotnet/sdk:6.0-nanoserver-1809 AS build
ARG configuration=Release
WORKDIR /src
COPY ["ServerSideApp/ServerSideApp/ServerSideApp.csproj", "ServerSideApp/ServerSideApp/"]
RUN dotnet restore "ServerSideApp\ServerSideApp\ServerSideApp.csproj"
COPY . .
WORKDIR "/src/ServerSideApp/ServerSideApp"
RUN dotnet build "ServerSideApp.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "ServerSideApp.csproj" -c $configuration -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ServerSideApp.dll"]
