from .state import AgentState


def follow_up_time(state: AgentState):

    print("Followuptime")
    print(state['preferences'])

    state['is_paused'] = "JAIMIN"

    return state
