#!/bin/bash

./kind create cluster --name infra --config cluster.yaml

kubectl cluster-info --context kind-infra

sleep 2

# nginx
kubectl apply -f cluster/nginx.yaml

echo "Waiting for ingress to setup"
sleep 60
echo "Ingress is ok, continue..."

# argocd
kubectl create namespace argocd
kubectl create namespace moleculer
helm dependency update cluster/argocd
helm upgrade -n argocd --install argocd cluster/argocd
